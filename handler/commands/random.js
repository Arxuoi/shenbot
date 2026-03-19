const axios = require('axios');
const config = require('../../config');

const randomCommand = {
  // Hentai Random
  hentai: async ({ sock, sender, msg }) => {
    try {
      await sock.sendMessage(sender, {
        text: '⏳ Sedang mengambil gambar...'
      });

      const apiUrl = `${config.baseUrl}/random/hentai?apikey=${config.apikey}`;

      await sock.sendMessage(sender, {
        image: { url: apiUrl },
        caption: `🔞 *Random Hentai*` 
      }, { quoted: msg });

    } catch (error) {
      console.error('Hentai Error:', error.message);
      await sock.sendMessage(sender, {
        text: '❌ Terjadi kesalahan saat mengambil gambar.'
      }, { quoted: msg });
    }
  },

  // Ero Random
  ero: async ({ sock, sender, msg }) => {
    try {
      await sock.sendMessage(sender, {
        text: '⏳ Sedang mengambil gambar...'
      });

      const apiUrl = `${config.baseUrl}/random/ero?apikey=${config.apikey}`;

      await sock.sendMessage(sender, {
        image: { url: apiUrl },
        caption: `🔞 *Random Ero*` 
      }, { quoted: msg });

    } catch (error) {
      console.error('Ero Error:', error.message);
      await sock.sendMessage(sender, {
        text: '❌ Terjadi kesalahan saat mengambil gambar.'
      }, { quoted: msg });
    }
  }
};

module.exports = randomCommand;
