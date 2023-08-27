import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config.js";
import OpenAIQuote from '../enums/OpenAIQuote.js';

const getAIGeneratedQuote = async (prompt: string) => {

    try{
    const openai = new OpenAIApi(openaiAPIConfig);
    const completion = await openai.createCompletion({
        model: OpenAIQuote.MODEL_NAME,
        prompt
      });
      return completion.data.choices.reduce((acc, curr) => {

          return acc + curr.text
      }, '');
    }catch(err){
        return (err as Error).message
    }
}

export default getAIGeneratedQuote