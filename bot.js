import { Telegraf } from 'telegraf';
import { Token } from './components/exportToken.js';
import { wordProcessingRequest } from './components/wordProcessingRequest.js';
import { audioProcessingRequest } from './components/audioProcessingRequest.js';
import { textStart } from './components/contentBot.js';

const bot = new Telegraf(Token);

bot.start(async (ctx) => {
    try {
        await ctx.reply(textStart.text1);
        await ctx.reply(textStart.text2);
        // await ctx.replyWithSticker("CAACAgIAAxkBAAEcc3Zj051QFBnH2JYGW5Z2uTE3csBHXAACJgMAApzW5wpVzm400GJTXi0E");
    } catch (error) {
        console.error(error);
    }
});

bot.help((ctx) => ctx.reply(textStart.textHelp));

bot.on('text', async (ctx) => {
    wordProcessingRequest(ctx);
});

bot.on('voice', async (ctx) => {
    audioProcessingRequest(ctx);
});

bot.launch();

console.log('Bot is running...');


// bot.command('work', async (ctx) => {
    //     try {
    
    
    //         //     await ctx.reply(`Какие из этих материалов вы прочитали?
    //         // `, {
    //         //         reply_markup: {
    //         //             inline_keyboard: [[
    //         //                 { text: "О Хакатоне deliver.latoken.com/hackathon", callback_data: '15min' },
    //         //                 { text: "О Латокен deliver.latoken.com/about", callback_data: '30min' },
    //         //                 { text: "Большая часть из #nackedmanagement coda.io/@latoken/latoken-talent/nakedmanagement-88", callback_data: '1h' }
    //         //             ]]
    //         //         }
    //         //     })
    
    //         // await ctx.replyWithSticker("CAACAgIAAxkBAAEcc3Zj051QFBnH2JYGW5Z2uTE3csBHXAACJgMAApzW5wpVzm400GJTXi0E");
    //     } catch (error) {
    //         console.error(error);
    //         ctx.reply(`что то пошло нетак попробуйте снова /work`)
    //     }
    // });