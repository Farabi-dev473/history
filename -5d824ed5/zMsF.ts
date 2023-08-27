import { Configuration } from "openai";
const configuration = new Configuration({
    organization: "org-4ggCKWgoIeAhew4T11HoKG0m",
    apiKey: process.env.OPENAI_API_KEY,
});

export default configuration