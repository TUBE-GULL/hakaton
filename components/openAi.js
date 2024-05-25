import OpenAI from 'openai';
import { TokenGpt } from './exportToken.js';

const openAi = new OpenAI({
    apiKey: TokenGpt,
});

export { openAi }