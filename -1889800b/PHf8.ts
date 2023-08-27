import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config";

const getAIGeneratedQuote = async (prompt: string) => {

    try{
    const openai = new OpenAIApi(openaiAPIConfig);
    const completion = await openai.createCompletion({
        model: OpenAIQuote.MODEL_NAME,
        prompt
      });
    }catch(err){
        return (err as Error).message
    }
}