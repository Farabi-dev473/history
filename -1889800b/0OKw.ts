import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config.js";

const getAIGeneratedQuote = async (prompt: string) => {

    try{
    const openai = new OpenAIApi(openaiAPIConfig);
    const completion = await openai.createCompletion({
        model: OpenAIQuote.MODEL_NAME,
        prompt
      });

      console.log(completion);
      return completion.data.choices[0].text;
    }catch(err){
        return (err as Error).message
    }
}

export default getAIGeneratedQuote