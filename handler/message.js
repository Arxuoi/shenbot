const chalk = require('chalk');
const moment = require('moment-timezone');
const config = require('../config');

// Import commands
const aiCommand = require('./commands/ai');
const bratCommand = require('./commands/brat');
const downloaderCommand = require('./commands/downloader');
const searchCommand = require('./commands/search');
const menuCommand = require('./commands/menu');
const ownerCommand = require('./commands/owner');
const skinToneCommand = require('./commands/skin-tone');
const aiPhotoCommand = require('./commands/aiphoto');
const randomCommand = require('./commands/random');

// Message Handler
async function messageHandler(sock, m) {
  try {
    const msg = m.messages[0];
    if (!msg.message) return;

    // Get message content - handle all message types
    let messageContent = '';
    if (msg.message.conversation) {
      messageContent = msg.message.conversation;
    } else if (msg.message.extendedTextMessage?.text) {
      messageContent = msg.message.extendedTextMessage.text;
    } else if (msg.message.imageMessage?.caption) {
      messageContent = msg.message.imageMessage.caption;
    } else if (msg.message.videoMessage?.caption) {
      messageContent = msg.message.videoMessage.caption;
    }

    // Get sender info
    const sender = msg.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderName = msg.pushName || 'Unknown';
    const senderNumber = sender.split('@')[0];

    // Check prefix
    const usedPrefix = config.prefix.find(p => messageContent.startsWith(p));
    if (!usedPrefix) return;

    // Parse command and args
    const args = messageContent.slice(usedPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const text = args.join(' ');

    // Log message
    const time = moment().tz(config.timezone).format('HH:mm:ss');
    console.log(chalk.white(`[${time}]`), 
                chalk.yellow(`[${isGroup ? 'GROUP' : 'PRIVATE'}]`),
                chalk.cyan(`[${senderName}]`),
                chalk.green(`[${usedPrefix}${command}]`),
                chalk.white(text));

    // Auto read message
    if (config.autoRead) {
      await sock.readMessages([msg.key]);
    }

    // Auto typing
    if (config.autoTyping) {
      await sock.sendPresenceUpdate('composing', sender);
    }

    // Command Handler
    const context = {
      sock,
      msg,
      sender,
      isGroup,
      senderName,
      args,
      text,
      usedPrefix,
      command
    };

    switch (command) {
      // AI Commands
      case 'ai':
      case 'chatgpt':
      case 'gpt':
        await aiCommand.chatGPT(context);
        break;

      case 'gptlogic':
      case 'logic':
        await aiCommand.gptLogic(context);
        break;

      case 'aiphoto':
      case 'flux':
      case 'aigambar':
        await aiPhotoCommand.generate(context);
        break;

      // Generator
      case 'brat':
      case 'bratgen':
        await bratCommand.generate(context);
        break;

      case 'skintone':
      case 'skin':
        await skinToneCommand.generate(context);
        break;

      // Downloader
      case 'download':
      case 'dl':
      case 'aio':
      case 'aiodl':
        await downloaderCommand.aioDownload(context);
        break;

      // Search
      case 'pinterest':
      case 'pin':
        await searchCommand.pinterest(context);
        break;

      case 'wiki':
      case 'wikipedia':
        await searchCommand.wikipedia(context);
        break;

      // Random NSFW
      case 'hentai':
        await randomCommand.hentai(context);
        break;

      case 'ero':
        await randomCommand.ero(context);
        break;

      // Menu & Info
      case 'menu':
      case 'help':
        await menuCommand.showMenu(context);
        break;

      case 'owner':
        await ownerCommand.showOwner(context);
        break;

      case 'ping':
        await sock.sendMessage(sender, { 
          text: `🏓 Pong! Bot aktif dan berjalan dengan baik.` 
        }, { quoted: msg });
        break;

      default:
        // Unknown command
        break;
    }

    // Stop typing
    await sock.sendPresenceUpdate('paused', sender);

  } catch (error) {
    console.error(chalk.red('[!] Error in message handler:'), error);
  }
}

module.exports = messageHandler;
