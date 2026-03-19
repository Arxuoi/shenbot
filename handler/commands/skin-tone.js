const axios = require('axios');
const config = require('../../config');

const skinToneCommand = {
  // Skin Tone Generator
  generate: async ({ sock, sender, text, msg }) => {
    try {
      if (!text) {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !skintone https://example.com/foto.jpg'
        }, { quoted: msg });
      }

      // Validate URL
      const urlPattern = /(https?:\/\/[^\s]+)/g;
      const url = text.match(urlPattern)?.[0];

      if (!url) {
        return await sock.sendMessage(sender, {
          text: '❌ URL gambar tidak valid!\n\nContoh: !skintone https://example.com/foto.jpg'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '⏳ Sedang mengubah skin tone...'
      });

      const apiUrl = `${config.baseUrl}/create/skin-tone?url=${encodeURIComponent(url)}&apikey=${config.apikey}`;

      // Send image directly from URL
      await sock.sendMessage(sender, {
        image: { url: apiUrl },
        caption: `✅ *Skin Tone Generator*\n\n🖼️ Source: ${url}`
      }, { quoted: msg });

    } catch (error) {
      console.error('Skin Tone Error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Terjadi kesalahan saat mengubah skin tone.'
      }, { quoted: msg });
    }
  }
};

module.exports = skinToneCommand;
