
const express = require("express");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const pino = require("pino");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🤖 MD BOT is running! 🇭🇹");
});

app.get("/health", (req, res) => {
  res.json({ status: "online", bot: "MD BOT" });
});

app.listen(PORT, () => {
  console.log("🌐 MD BOT server running on port " + PORT);
});

async function startBot() {
  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    browser: ["MD BOT", "Chrome", "1.0.0"],
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  if (!state.creds.registered && process.env.PHONE_NUMBER) {
    const number = process.env.PHONE_NUMBER.replace(/\D/g, "");
    const code = await sock.requestPairingCode(number);
    console.log("🔑 MD BOT PAIRING CODE:", code);
  }

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("✅ MD BOT CONNECTED TO WHATSAPP");
    }

    if (connection === "close") {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      console.log("❌ Connection closed:", statusCode);

      if (statusCode !== DisconnectReason.loggedOut) {
        setTimeout(() => startBot(), 5000);
      } else {
        console.log("⚠️ Session logged out. Reconnect required.");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg?.message || msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    if (!jid || jid === "status@broadcast") return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const command = text.trim().toLowerCase();

    if (command.startsWith(".")) {
      await sock.sendMessage(jid, {
        react: { text: "🔥", key: msg.key }
      });
    }

    if (command === ".ping") {
      await sock.sendMessage(jid, {
        text: "🏓 MD BOT: Pong!"
      });
    }

    if (command === ".alive") {
      await sock.sendMessage(jid, {
        text: "🤖 MD BOT IS ONLINE 🇭🇹"
      });
    }

    if (command === ".menu") {
      await sock.sendMessage(jid, {
        text:
          "╭━━━〔 🤖 MD BOT 〕━━━╮\n" +
          "┃ 🇭🇹 Powered by MISTER XR\n" +
          "┣━━━━━━━━━━━━━━\n" +
          "┃ .menu  - Menu\n" +
          "┃ .ping  - Test bot la\n" +
          "┃ .alive - Estati bot la\n" +
          "┣━━━━━━━━━━━━━━\n" +
          "┃ 📢 CHANNEL OFISYÈL\n" +
          "┃ Swiv Channel nou an:\n" +
          "┃ https://whatsapp.com/channel/0029Vb8oizBBKfi9ZF3urZ29\n" +
          "╰━━━━━━━━━━━━━━╯"
      });
    }
  });
}

startBot().catch(err => {
  console.error("❌ MD BOT ERROR:", err);
});
            
