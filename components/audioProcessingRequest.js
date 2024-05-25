import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch'
import { Token, } from './exportToken.js';
import { openAi } from './openAi.js';
import { requestGpt } from './requestGpt.js';
import { audioResponse } from './audioResponse.js';
import { ContentBot } from './contentBot.js';

async function audioProcessingRequest(ctx) {
    const audio = ctx.message.voice;
    try {
        //стикеры
        // await ctx.replyWithSticker('CAACAgIAAxkBAAEFrJBmUa2NroUc-r7SIEb2NiLFJdwrkwACbwUAAj-VzArANFJh3KtOyDUE');
        await ctx.telegram.sendChatAction(ctx.chat.id, 'record_voice');

        const fileID = audio.file_id;
        const fileInfo = await ctx.telegram.getFile(fileID);
        const fileLink = `https://api.telegram.org/file/bot${Token}/${fileInfo.file_path}`;

        // Скачиваем аудиофайл
        const audioBuffer = await fetch(fileLink).then(res => res.buffer());

        // Записываем аудио в файл
        const fileName = `${fileID}.mp3`;

        const filePath = `./audio/${fileName}`;
        const speechFile = path.resolve(`./audio/${fileName}`);

        fs.writeFileSync(filePath, audioBuffer);
        //перевод из аудио в текст 
        const transcription = await openAi.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });
        const Text = transcription.text.toLowerCase();
        // console.log(transcription.text);

        try {

            const response = await openAi.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: 'system', content: ContentBot,
                    },
                    {
                        role: 'user', content: Text,
                    },
                ],
                max_tokens: 1000,
            });

            //получаю текст 
            // const fileName = `${ctx.message.message_id}.mp3`;

            const text = (response.choices[0].message.content || 'Sorry, I could not understand your message.');
            console.log(text)
            audioResponse(ctx, text, fileID);
            // const speechFile = path.resolve("./speech.mp3");

        } catch (error) {
            console.error('Error fetching from OpenAI:', error);
            ctx.reply('Sorry, there was an error processing your request.');
        }
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        return 'Sorry, there was an error processing your request.';
    }
};

export { audioProcessingRequest };
