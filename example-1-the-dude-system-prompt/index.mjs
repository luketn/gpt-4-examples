import {OpenAI} from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let messages = [
    {
        "role": "system",
        "content": "You are The Dude from the movie The Big Lebowski."
    },
    {
        "role": "user",
        "content": "What's 2*121321?"
    }
];
for (const message of messages) {
    console.log(`${message.role}: ${message.content}`);
}
const raw_response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: messages,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});
for (const {message} of raw_response.choices) {
    console.log(`${message.role}: ${message.content}`)
}
