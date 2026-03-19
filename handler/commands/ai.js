const axios = require('axios');
const config = require('../../config');

const aiCommand = {
  // ChatGPT-4 (Basic)
  chatGPT: async ({ sock, sender, text, msg }) => {
    try {
      if (!text) {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !ai halo, apa kabar?'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '⏳ Sedang memproses...'
      });

      const response = await axios.get(
        `${config.baseUrl}/ai/chat4?query=${encodeURIComponent(text)}&apikey=${config.apikey}`
      );

      console.log('AI Response:', JSON.stringify(response.data, null, 2));

      let aiResponse = '';

      if (response.data) {
        // API format: { success: true, result: { message: "..." } }
        if (response.data.result && typeof response.data.result === 'object') {
          aiResponse = response.data.result.message || JSON.stringify(response.data.result);
        } else if (typeof response.data === 'string') {
          aiResponse = response.data;
        } else if (response.data.message) {
          aiResponse = response.data.message;
        } else {
          aiResponse = JSON.stringify(response.data);
        }
      }

      if (aiResponse && aiResponse !== '{}' && aiResponse !== 'null') {
        await sock.sendMessage(sender, {
          text: `🤖 *ChatGPT-4*\n\n${aiResponse}`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(sender, {
          text: '❌ Gagal mendapatkan respons dari AI.'
        }, { quoted: msg });
      }

    } catch (error) {
      console.error('AI Error:', error.message);
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
      }
      
      let errorMsg = '❌ Terjadi kesalahan saat memproses permintaan AI.';
      if (error.response?.data?.message) {
        errorMsg += `\n\n*Detail:* ${error.response.data.message}`;
      } else if (error.message) {
        errorMsg += `\n\n*Error:* ${error.message}`;
      }
      
      await sock.sendMessage(sender, {
        text: errorMsg
      }, { quoted: msg });
    }
  },

  // GPT Logic (Advanced with prompt)
  gptLogic: async ({ sock, sender, text, msg }) => {
    try {
      if (!text) {
        return await sock.sendMessage(sender, {
          text: '❌ *Format salah!*\n\nContoh: !gptlogic jelaskan tentang\n\nKamu adalah guru yang sabar'
        }, { quoted: msg });
      }

      // Split text into message and prompt (separated by newline)
      const parts = text.split('\n');
      const message = parts[0];
      const prompt = parts.slice(1).join('\n') || '';

      if (!message) {
        return await sock.sendMessage(sender, {
          text: '❌ *Pesan tidak boleh kosong!*\n\nContoh: !gptlogic jelaskan tentang AI\n\nKamu adalah ahli teknologi'
        }, { quoted: msg });
      }

      await sock.sendMessage(sender, {
        text: '⏳ GPT Logic sedang berpikir...'
      });

      const response = await axios.get(
        `${config.baseUrl}/ai/chat4?messages=${encodeURIComponent(message)}&prompt=${encodeURIComponent(prompt)}&apikey=${config.apikey}`
      );

      console.log('GPT Logic Response:', JSON.stringify(response.data, null, 2));

      let aiResponse = '';

      if (response.data) {
        if (response.data.result && typeof response.data.result === 'object') {
          aiResponse = response.data.result.message || JSON.stringify(response.data.result);
        } else if (typeof response.data === 'string') {
          aiResponse = response.data;
        } else if (response.data.message) {
          aiResponse = response.data.message;
        } else {
          aiResponse = JSON.stringify(response.data);
        }
      }

      if (aiResponse && aiResponse !== '{}' && aiResponse !== 'null') {
        await sock.sendMessage(sender, {
          text: `🧠 *GPT Logic*\n\n${aiResponse}`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(sender, {
          text: '❌ Gagal mendapatkan respons dari GPT Logic.'
        }, { quoted: msg });
      }

    } catch (error) {
      console.error('GPT Logic Error:', error.message);
      await sock.sendMessage(sender, {
        text: `❌ Terjadi kesalahan saat memproses GPT Logic.\n\n*Error:* ${error.message}`
      }, { quoted: msg });
    }
  }
};

module.exports = aiCommand;
