import { contentBot } from './contentBot.js';

function sorting(func, text) {
    if (text == 'вакансия') {
        console.log('вакансия')
        return func(contentBot.vacanciesPrompt);
    }
    if (text == 'Хакатон') {
        console.log('Хакатон')
        return func(contentBot.hahaTon);
    }
    if (text == 'LATOKEN' || text == 'Латокен') {
        console.log('LATOKEN')
        return func(contentBot.oLaTokenPrompt);
    } else {
        return func(contentBot.hello);
    }
};

export { sorting };