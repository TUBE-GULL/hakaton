import { audioResponse } from './audioResponse.js';
import { ContentBot } from './contentBot.js';
import { openAi } from './openAi.js';

async function requestGpt(ctx, message) {
    try {
        //стикеры
        // await ctx.replyWithSticker('CAACAgIAAxkBAAEFrJRmUa6gBrCgXhhZdECmNrqp7y9IGwACSAIAAladvQoc9XL43CkU0DUE');

        const response = await openAi.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: 'system', content: ContentBot,
                },
                {
                    role: 'user', content: message,
                },
            ],
            max_tokens: 1000,
        });

        //получаю текст 
        // const fileName = `${ctx.message.message_id}.mp3`;

        const text = (response.choices[0].message.content || 'Sorry, I could not understand your message.');
        await ctx.reply(text)

        // const speechFile = path.resolve("./speech.mp3");
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        ctx.reply('Sorry, there was an error processing your request.');
    }
}

export { requestGpt }