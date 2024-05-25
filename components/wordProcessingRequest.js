import { requestGpt } from './requestGpt.js';

async function wordProcessingRequest(ctx) {
    const message = ctx.message.text.toLowerCase();
    const userId = ctx.message.from.id;
    const firstWord = message.split(" ");
    const usersData = {};

    const writeForm = (answer) => {
        usersData[userId] = answer;
    };

    switch (firstWord[0]) {
        case 'work':
            await ctx.reply(`AIxWeb3 Хакатон Латокен   
            Проверьте, готовы ли вы к результативному хакатону и интервью с помощью этого короткого теста. 
            
            Перед прохождением изучите материалы О Латокен(https://deliver.latoken.com/about) и правила Хакатона(https://deliver.latoken.com/hackathon) (мы используем canva, недоступную в РФ - используйте VPN)
            `);
            await ctx.reply(`напишите свой mail ваш майл `)
            break;

        case 'mail':
            writeForm({ mail: firstWord[1] });

            await ctx.reply(`Какие из этих материалов вы прочитали?
            если больше одного просто напиши read 1 2 3`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: "О Хакатоне deliver.latoken.com/hackathon", callback_data: 'read 1' },
                        { text: "О Латокен deliver.latoken.com/about", callback_data: 'read 2' },
                        { text: " Большая часть из #nackedmanagement coda.io/@latoken/latoken-talent/nakedmanagement-88", callback_data: 'read 3' }
                    ]]
                }
            });

            break;

        case 'read':
            writeForm(userId, { read: firstWord.slice(1).join(' ') });

            await ctx.reply(`Какой призовой фонд на Хакатоне?`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: "25,000 Опционов", callback_data: 'prize 1' },
                        { text: "100,000 Опционов или 10,000 LA", callback_data: 'prize 2' },
                        { text: "Только бесценный опыт", callback_data: 'prize 3' }
                    ]]
                }
            })

            break;

        case 'prize':
            writeForm(userId, { prize: firstWord[1] });

            await ctx.reply(`Что от вас ожидают на хакатоне в первую очередь?`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: "Показать мои способности узнавать новые технологии", callback_data: 'expect 1' },
                        { text: "Показать работающий сервис", callback_data: 'expect 2' },
                        { text: "Продемонстрировать навыки коммуникации и командной работы", callback_data: 'expect 3' }
                    ]]
                }
            })
            break;

        case 'expect':
            writeForm(userId, { prize: firstWord[1] });

            await ctx.reply(`Что из этого является преимуществом работы в Латокен?`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: "Показать мои способности узнавать новые технологии", callback_data: 'benefits 1' },
                        { text: "Показать работающий сервис", callback_data: 'benefits 2' },
                        { text: "Продемонстрировать навыки коммуникации и командной работы", callback_data: 'benefits 3' }
                    ]]
                }
            })
            break;


        case 'benefits':

            break;

        case 'salary':

            break;

        case 'schedule':

            break;

        case 'signs':

            break;

        case 'team':

            break;

        case 'exam':

            break;

        case 'Brick':

            break;

        case 'pros':

            break;

        default:
            await requestGpt(ctx, message);

            break;
    }
};

export { wordProcessingRequest };
