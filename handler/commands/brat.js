const axios = require('axios');
const config = require('../../config');

const bratCommand = {
  // Generate Brat Image
  generate: async ({ sock, sender, text, msg }) => {
    try {
      if (!text) {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !brat Hello World'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '⏳ Sedang membuat gambar brat...'
      });

      const apiUrl = `${config.baseUrl}/create/brat?text=${encodeURIComponent(text)}&apikey=${config.apikey}`;

      // Send image directly from URL
      await sock.sendMessage(sender, {
        image: { url: apiUrl },
        caption: `✅ *Brat Generator*\n\n📝 Text: ${text}`
      }, { quoted: msg });

    } catch (error) {
      console.error('Brat Error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Terjadi kesalahan saat membuat gambar brat.'
      }, { quoted: msg });
    }
  }
};

module.exports = bratCommand;
