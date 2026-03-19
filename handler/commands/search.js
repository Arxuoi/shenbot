const axios = require('axios');
const config = require('../../config');

const searchCommand = {
  // Pinterest Search
  pinterest: async ({ sock, sender, text, msg }) => {
    try {
      console.log('Pinterest command triggered. Text:', text);
      
      if (!text || text.trim() === '') {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !pinterest anime wallpaper'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '🔍 Sedang mencari di Pinterest...'
      });

      const apiUrl = `${config.baseUrl}/search/pinterest?query=${encodeURIComponent(text)}&apikey=${config.apikey}`;
      console.log('Pinterest API URL:', apiUrl);

      const response = await axios.get(apiUrl, { timeout: 30000 });

      const data = response.data;
      console.log('Pinterest Response:', JSON.stringify(data, null, 2));

      // API returns: { success: true, result: ["url1", "url2", ...] }
      if (data.success && data.result && Array.isArray(data.result) && data.result.length > 0) {
        // Send first 5 results
        const results = data.result.slice(0, 5);
        
        await sock.sendMessage(sender, {
          text: `✅ *Pinterest Search*\n🔍 Query: ${text}\n📊 Ditemukan: ${data.result.length} hasil\n\nMengirim ${results.length} gambar...`
        });

        for (let i = 0; i < results.length; i++) {
          const imageUrl = results[i];
          console.log(`Sending image ${i + 1}:`, imageUrl);
          try {
            await sock.sendMessage(sender, {
              image: { url: imageUrl },
              caption: `📌 *Hasil ${i + 1}*`
            });
          } catch (e) {
            console.log('Error sending image:', e.message);
          }
        }

      } else {
        await sock.sendMessage(sender, {
          text: '❌ Tidak ditemukan hasil untuk pencarian tersebut.'
        }, { quoted: msg });
      }

    } catch (error) {
      console.error('Pinterest Error:', error.message);
      console.error('Pinterest Error Stack:', error.stack);
      if (error.response) {
        console.error('Pinterest Error Response:', error.response.data);
      }
      await sock.sendMessage(sender, {
        text: `❌ Terjadi kesalahan saat mencari di Pinterest.\n\n*Error:* ${error.message}`
      }, { quoted: msg });
    }
  },

  // Wikipedia Search
  wikipedia: async ({ sock, sender, text, msg }) => {
    try {
      console.log('Wiki command triggered. Text:', text);
      
      if (!text || text.trim() === '') {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !wiki Indonesia'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '🔍 Sedang mencari di Wikipedia...'
      });

      // Using Wikipedia API with timeout
      const wikiUrl = `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`;
      console.log('Wiki API URL:', wikiUrl);
      
      const response = await axios.get(wikiUrl, { timeout: 15000 });

      const data = response.data;
      console.log('Wiki Response:', JSON.stringify(data, null, 2));

      if (data && data.extract) {
        let result = `📚 *Wikipedia*\n\n`;
        result += `*${data.title}*\n\n`;
        result += `${data.extract}\n\n`;
        if (data.content_urls?.desktop?.page) {
          result += `🔗 Baca selengkapnya: ${data.content_urls.desktop.page}`;
        }

        // Send thumbnail if available
        if (data.thumbnail?.source) {
          await sock.sendMessage(sender, {
            image: { url: data.thumbnail.source },
            caption: result
          }, { quoted: msg });
        } else {
          await sock.sendMessage(sender, {
            text: result
          }, { quoted: msg });
        }

      } else {
        await sock.sendMessage(sender, {
          text: '❌ Artikel tidak ditemukan di Wikipedia.'
        }, { quoted: msg });
      }

    } catch (error) {
      console.error('Wiki Error:', error.message);
      console.error('Wiki Error Stack:', error.stack);
      
      // Fallback: use search instead of direct page
      try {
        console.log('Trying Wikipedia fallback search...');
        const searchResponse = await axios.get(
          `https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(text)}&format=json&origin=*`,
          { timeout: 10000 }
        );
        
        const searchResults = searchResponse.data.query?.search;
        console.log('Wiki fallback results:', searchResults?.length || 0);
        
        if (searchResults && searchResults.length > 0) {
          let resultText = `📚 *Wikipedia Search: ${text}*\n\n`;
          searchResults.slice(0, 5).forEach((item, i) => {
            const snippet = item.snippet.replace(/<[^>]*>/g, '');
            resultText += `${i + 1}. *${item.title}*\n${snippet}...\n\n`;
          });
          resultText += `🔗 https://id.wikipedia.org/wiki/${encodeURIComponent(searchResults[0].title.replace(/ /g, '_'))}`;
          
          await sock.sendMessage(sender, {
            text: resultText
          }, { quoted: msg });
        } else {
          await sock.sendMessage(sender, {
            text: '❌ Artikel tidak ditemukan di Wikipedia.'
          }, { quoted: msg });
        }
      } catch (fallbackError) {
        console.error('Wiki Fallback Error:', fallbackError.message);
        await sock.sendMessage(sender, {
          text: `❌ Terjadi kesalahan saat mencari di Wikipedia.\n\n*Error:* ${error.message}`
        }, { quoted: msg });
      }
    }
  }
};

module.exports = searchCommand;
