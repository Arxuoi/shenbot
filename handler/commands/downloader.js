const axios = require('axios');
const config = require('../../config');

const downloaderCommand = {
  // All-in-One Downloader
  aioDownload: async ({ sock, sender, text, msg }) => {
    try {
      if (!text) {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !dl https://www.youtube.com/watch?v=xxxxx\n\n*Supported:*\n• YouTube\n• TikTok\n• Instagram\n• Facebook\n• Twitter/X'
        }, { quoted: msg });
      }

      // Validate URL
      const urlPattern = /(https?:\/\/[^\s]+)/g;
      const url = text.match(urlPattern)?.[0];

      if (!url) {
        return await sock.sendMessage(sender, {
          text: '❌ URL tidak valid!'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '⏳ Sedang mengunduh...'
      });

      const response = await axios.get(
        `${config.baseUrl}/download/aio3?url=${encodeURIComponent(url)}&apikey=${config.apikey}`
      );

      const data = response.data;

      if (data.status && data.result) {
        const result = data.result;
        
        // Send info
        let caption = `✅ *Download Berhasil!*\n\n`;
        if (result.title) caption += `📌 *Judul:* ${result.title}\n`;
        if (result.author) caption += `👤 *Author:* ${result.author}\n`;
        if (result.duration) caption += `⏱️ *Durasi:* ${result.duration}\n`;
        if (result.quality) caption += `📊 *Kualitas:* ${result.quality}\n`;
        caption += `\n📥 *Mengirim file...*`;

        await sock.sendMessage(sender, { text: caption });

        // Send media
        if (result.video) {
          await sock.sendMessage(sender, {
            video: { url: result.video },
            caption: `✅ Video berhasil diunduh!`
          }, { quoted: msg });
        } else if (result.audio) {
          await sock.sendMessage(sender, {
            audio: { url: result.audio },
            mimetype: 'audio/mp4'
          }, { quoted: msg });
        } else if (result.media) {
          await sock.sendMessage(sender, {
            video: { url: result.media },
            caption: `✅ Media berhasil diunduh!`
          }, { quoted: msg });
        }

      } else {
        await sock.sendMessage(sender, {
          text: '❌ Gagal mengunduh media. Pastikan URL valid.'
        }, { quoted: msg });
      }

    } catch (error) {
      console.error('Download Error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Terjadi kesalahan saat mengunduh. Coba lagi nanti.'
      }, { quoted: msg });
    }
  }
};

module.exports = downloaderCommand;
