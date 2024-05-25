import path from "path";
import fs from "fs";
import { openAi } from './openAi.js';

async function audioResponse(ctx, text, FileName) {
    try {
        const fileName = `${FileName}.mp3`;
        const speechFile = path.resolve(`./audio/${fileName}`);

        //преобразова́ть в речь 
        const mp3 = await openAi.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: text,
        });

        console.log(text);
        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);
        await ctx.replyWithVoice({ source: speechFile });
        // await ctx.replyWithVoice({ source: speechFile });
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        ctx.reply('Sorry, there was an error processing your request.');
    }
}

export { audioResponse }