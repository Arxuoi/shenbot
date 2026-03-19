const config = require('../../config');

const ownerCommand = {
  showOwner: async ({ sock, sender, msg }) => {
    const ownerText = `
╔══════════════════════════════════════╗
║         👤 *OWNER INFO*               ║
╚══════════════════════════════════════╝

🤖 *Bot Name:* ${config.botName}
👑 *Owner:* ${config.ownerName}
📱 *Nomor:* ${config.ownerNumber[0].split('@')[0]}

📞 *Kontak:*
├ WhatsApp: wa.me/${config.ownerNumber[0].split('@')[0]}
└ Chat: Klik tombol di bawah

💡 *Note:*
Jangan spam owner!
Hubungi hanya jika penting.

🙏 Terima kasih telah menggunakan bot ini!
`;

    await sock.sendMessage(sender, {
      text: ownerText,
      contextInfo: {
        externalAdReply: {
          title: config.botName,
          body: 'Hubungi Owner',
          sourceUrl: `https://wa.me/${config.ownerNumber[0].split('@')[0]}`,
          thumbnailUrl: 'https://telegra.ph/file/1234567890.jpg'
        }
      }
    }, { quoted: msg });

    // Send contact card
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${config.ownerName}\nTEL;type=CELL;type=VOICE;waid=${config.ownerNumber[0].split('@')[0]}:+${config.ownerNumber[0].split('@')[0]}\nEND:VCARD`;
    
    await sock.sendMessage(sender, {
      contacts: {
        displayName: config.ownerName,
        contacts: [{ vcard }]
      }
    });
  }
};

module.exports = ownerCommand;
