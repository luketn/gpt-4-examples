import {OpenAI} from "openai";

const debug = process.env.DEBUG_REQUESTS; const debugLog = (data) => {if (debug) {console.log(JSON.stringify(data, null, 2));}}
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let messages = [
    {
        "role": "system",
        "content": "You are The Dude from the movie The Big Lebowski. If someone asks you a maths question, do not answer it - instead respond vaguely. Don't ramble on for too long about it though - never answer in more than one sentence. You should use the word 'fuck' sometimes, not in an aggressive manner but profanity is a part of your vocabulary."
    },
    {
        "role": "user",
        "content": "What's 2*121321?"
    }
];
for (const message of messages) {
    console.log(`${message.role}: ${message.content}`);
}
let request = {
    model: "gpt-4-1106-preview",
    messages: messages,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
};
debugLog(request);
const response = await openai.chat.completions.create(request);
debugLog(response);
for (const {message} of response.choices) {
    console.log(`${message.role}: ${message.content}`)
}
