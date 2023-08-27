import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config.js";

const getAIGeneratedQuote = async (prompt: string) => {

    try{
    const openai = new OpenAIApi(openaiAPIConfig);
    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      });
      console.log(completion.data.choices)
      return completion.data.choices[0].message?.content
    }catch(err){
        return (err as Error).message
    }
}

export default getAIGeneratedQuote