const axios = require('axios');
const config = require('../../config');

const aiPhotoCommand = {
  // Flux Pro AI Photo Generator
  generate: async ({ sock, sender, text, msg }) => {
    try {
      if (!text) {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !aiphoto a beautiful sunset at the beach'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '⏳ AI sedang membuat gambar...'
      });

      const apiUrl = `${config.baseUrl}/ai/flux-pro?query=${encodeURIComponent(text)}&apikey=${config.apikey}`;

      // Send image directly from URL
      await sock.sendMessage(sender, {
        image: { url: apiUrl },
        caption: `✅ *AI Photo Generator (Flux Pro)*\n\n📝 Prompt: ${text}`
      }, { quoted: msg });

    } catch (error) {
      console.error('AI Photo Error:', error);
      await sock.sendMessage(sender, {
        text: '❌ Terjadi kesalahan saat membuat gambar AI.'
      }, { quoted: msg });
    }
  }
};

module.exports = aiPhotoCommand;
