const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const chalk = require('chalk');
const fs = require('fs-extra');
const qrcode = require('qrcode-terminal');

const config = require('./config');
const messageHandler = require('./handler/message');

// Logger
const logger = pino({ level: 'silent' });

// Start Bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger)
    },
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    generateHighQualityLinkPreview: true
  });

  // Connection Update - Handle QR Code
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    // Show QR Code
    if (qr) {
      console.log(chalk.yellow('\n[📱] Scan QR Code di bawah ini:\n'));
      qrcode.generate(qr, { small: true });
      console.log(chalk.cyan('[i] Buka WhatsApp → Menu → Perangkat Tertaut → Tautkan Perangkat\n'));
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(chalk.red('[!] Koneksi terputus!'));
      if (shouldReconnect) {
        console.log(chalk.yellow('[i] Mencoba menghubungkan kembali...'));
        startBot();
      }
    } else if (connection === 'open') {
      console.log(chalk.green('[✓] Bot berhasil terhubung!'));
      console.log(chalk.cyan(`[i] Bot Name: ${config.botName}`));
      console.log(chalk.cyan(`[i] Prefix: ${config.prefix.join(', ')}`));
      console.log(chalk.cyan('[i] Ketik .menu untuk melihat daftar fitur\n'));
    }
  });

  // Credentials Update
  sock.ev.on('creds.update', saveCreds);

  // Messages Handler
  sock.ev.on('messages.upsert', async (m) => {
    await messageHandler(sock, m);
  });

  return sock;
}

// Create session folder if not exists
if (!fs.existsSync('./session')) {
  fs.mkdirSync('./session', { recursive: true });
}

// Start
console.log(chalk.cyan('╔════════════════════════════════════╗'));
console.log(chalk.cyan('║     NAZE WHATSAPP BOT              ║'));
console.log(chalk.cyan('║     Multi Fitur - Termux Ready     ║'));
console.log(chalk.cyan('╚════════════════════════════════════╝\n'));

startBot().catch((err) => {
  console.log(chalk.red('[!] Error:'), err);
});
