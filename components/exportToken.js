import dotenv from 'dotenv';

dotenv.config();

const Token = process.env.TOKEN_BOT;
const TokenGpt = process.env.TOKEN_GPT;

export { Token, TokenGpt }
