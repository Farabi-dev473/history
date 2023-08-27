import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config.js";
import OpenAIQuote from '../enums/OpenAIQuote.js';

const getAIGeneratedQuote = async (prompt: string) => {

    try{
        // initialize OpenAI API
        const openai = new OpenAIApi(openaiAPIConfig);
        const completion = await openai.createChatCompletion({
        model: OpenAIQuote.ROLE,
        messages: [{role: OpenAIQuote.ROLE, content: prompt}],
      });

      return completion.data.choices[0].message?.content
    }catch(err){
      console.log(err)
      return (err as Error).message
    }
}

export default getAIGeneratedQuote