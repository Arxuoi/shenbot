const config = require('../../config');
const fs = require('fs');
const path = require('path');

const menuCommand = {
  showMenu: async ({ sock, sender, usedPrefix, msg }) => {
    const menuText = `
╔══════════════════════════════════════╗
║     🤖 *${config.botName}*              ║
║     WhatsApp Multi Fitur Bot         ║
╚══════════════════════════════════════╝

👤 *Owner:* ${config.ownerName}
⏰ *Waktu:* ${new Date().toLocaleString('id-ID', { timeZone: config.timezone })}
🔧 *Prefix:* ${config.prefix.join(', ')}

📋 *DAFTAR FITUR*

🤖 *AI (Artificial Intelligence)*
├ ${usedPrefix}ai <teks> - Chat dengan AI
├ ${usedPrefix}chatgpt <teks> - ChatGPT-4
├ ${usedPrefix}gpt <teks> - Alias AI
├ ${usedPrefix}gptlogic <teks> - GPT Logic (dengan prompt)
├ ${usedPrefix}logic <teks> - Alias gptlogic
├ ${usedPrefix}aiphoto <prompt> - Generate gambar AI (Flux Pro)
├ ${usedPrefix}flux <prompt> - Alias aiphoto
└ ${usedPrefix}aigambar <prompt> - Alias aiphoto

🎨 *Generator*
├ ${usedPrefix}brat <teks> - Buat gambar brat
├ ${usedPrefix}bratgen <teks> - Alias brat
└ ${usedPrefix}skintone <url> - Ubah skin tone foto

📥 *Downloader (AIO2)*
├ ${usedPrefix}dl <url> - All-in-One Downloader
├ ${usedPrefix}download <url> - Alias dl
├ ${usedPrefix}aio <url> - Alias downloader
└ ${usedPrefix}aiodl <url> - Alias downloader

*Supported URL:*
• YouTube (Video/Music)
• TikTok (Video/Gambar)
• Instagram (Reels/Post)
• Facebook (Video)
• Twitter/X (Video)

🔍 *Search*
├ ${usedPrefix}pinterest <query> - Cari gambar Pinterest
├ ${usedPrefix}pin <query> - Alias pinterest
├ ${usedPrefix}wiki <query> - Cari Wikipedia
└ ${usedPrefix}wikipedia <query> - Alias wiki

🔞 *NSFW (18+)*
├ ${usedPrefix}hentai - Random hentai image
└ ${usedPrefix}ero - Random ero image

ℹ️ *Info*
├ ${usedPrefix}menu - Tampilkan menu ini
├ ${usedPrefix}help - Alias menu
├ ${usedPrefix}ping - Cek status bot
└ ${usedPrefix}owner - Info owner

╔══════════════════════════════════════╗
║  💡 *Tips:* Gunakan fitur dengan bijak ║
║  📞 Hubungi owner jika ada masalah     ║
╚══════════════════════════════════════╝
`;

    // Send banner image if exists
    const bannerPath = path.join(process.cwd(), 'banner.png');
    
    try {
      if (fs.existsSync(bannerPath)) {
        await sock.sendMessage(sender, {
          image: { url: bannerPath },
          caption: menuText
        }, { quoted: msg });
      } else {
        await sock.sendMessage(sender, {
          text: menuText
        }, { quoted: msg });
      }
    } catch (error) {
      console.error('Menu Error:', error.message);
      await sock.sendMessage(sender, {
        text: menuText
      }, { quoted: msg });
    }
  }
};

module.exports = menuCommand;
