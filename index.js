
<!DOCTYPE html>
<html lang="ht">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#07110c">
  <title>MD BOT | Official</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #07110c;
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      width: 100%;
      max-width: 440px;
      background: #101d15;
      border: 1px solid #1c6b3b;
      border-radius: 24px;
      padding: 30px 22px;
      text-align: center;
      box-shadow: 0 0 35px #00ff6630;
    }

    .logo {
      width: 115px;
      height: 115px;
      border-radius: 50%;
      border: 3px solid #00ff66;
      object-fit: cover;
      margin-bottom: 18px;
    }

    h1 {
      font-size: 32px;
      color: #00ff66;
      letter-spacing: 2px;
    }

    .subtitle {
      color: #a5b9aa;
      margin: 10px 0 24px;
      font-size: 14px;
    }

    .status {
      background: #0b2917;
      border: 1px solid #1c6b3b;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 20px;
      color: #00ff66;
      font-size: 14px;
    }

    .btn {
      display: block;
      width: 100%;
      padding: 15px;
      margin-top: 14px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: bold;
      font-size: 15px;
      border: none;
      cursor: pointer;
    }

    .channel {
      background: #00d65a;
      color: #061109;
    }

    .check {
      background: #1b2c20;
      color: #ffffff;
      border: 1px solid #315a3b;
    }

    .info {
      margin-top: 25px;
      padding: 15px;
      background: #0a160e;
      border-radius: 12px;
      color: #b4c4b8;
      font-size: 13px;
      line-height: 1.8;
    }

    footer {
      margin-top: 22px;
      color: #718578;
      font-size: 12px;
    }
  </style>
</head>

<body>
  <main class="container">

    <img
      class="logo"
      src="media/bot.jpg"
      alt="MD BOT Logo"
      onerror="this.style.display='none'"
    >

    <h1>MD BOT</h1>

    <p class="subtitle">
      🤖 WhatsApp Automation Platform 🇭🇹
    </p>

    <div class="status" id="status">
      🔄 Estati: Ap verifye...
    </div>

    <a
      class="btn channel"
      href="https://whatsapp.com/channel/0029Vb8oizBBKfi9ZF3urZ29"
      target="_blank"
      rel="noopener noreferrer"
    >
      📢 ABÒNE AK CHANNEL NOU AN
    </a>

    <button class="btn check" onclick="checkStatus()">
      🔄 VERIFYE ESTATI BOT LA
    </button>

    <section class="info">
      <strong>📌 MD BOT OFFICIAL</strong><br>
      🇭🇹 Powered by MISTER XR<br>
      🔥 Nouvo kòmand ak mizajou<br>
      📢 Swiv Channel la pou nouvèl
    </section>

    <footer>
      © 2026 MD BOT — Powered by MISTER XR
    </footer>

  </main>

  <script>
    async function checkStatus() {
      const status = document.getElementById("status");
      status.textContent = "🔄 Ap verifye estati...";

      try {
        const response = await fetch("/health");
        if (!response.ok) throw new Error("Offline");

        const data = await response.json();

        if (data.status === "online") {
          status.textContent = "🟢 MD BOT: ONLINE";
        } else {
          status.textContent = "🟠 MD BOT: PA KONFIME";
        }
      } catch (error) {
        status.textContent = "🔴 MD BOT: PA DISPONIB";
      }
    }

    checkStatus();
  </script>
</body>
</html>
