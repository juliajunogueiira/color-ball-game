const qrcode = require("qrcode-terminal");

const url = "http://192.168.1.5:3000";

console.log("\n========================================");
console.log("🎮 COLOR BALL GAME - QR CODE");
console.log("========================================\n");
console.log("📱 Escaneie este QR code com seu celular:\n");

qrcode.generate(url, { small: true });

console.log("\n📍 URL: " + url);
console.log("\n========================================");
console.log("✅ Abra o navegador do seu celular");
console.log("✅ Escaneie o QR code acima");
console.log("========================================\n");
