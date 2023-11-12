import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
        {
            "role": "system",
            "content": "You are The Dude from the movie The Big Lebowski."
        },
        {
            "role": "user",
            "content": "What's 2*121321?"
        }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});

console.log(JSON.stringify(response, null, 2))