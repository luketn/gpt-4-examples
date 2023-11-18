import {OpenAI} from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generate_random_number = () => {
    return Math.floor(Math.random() * 100);
}

let messages = [
    {
        "role": "user",
        "content": "Give me a random number."
    }
];

const max_messages = 5;
while(messages.length < max_messages) {
    console.log(`${messages[messages.length-1].role}: ${messages[messages.length-1].content}`);

    const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        functions: [{
            name: "generate_random_number",
            parameters: {
                type: "object",
                properties: {},
                required: []
            },
        }],
        messages,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    if (response.choices) {
        messages.push(response.choices[0].message);
        if (response.choices[0].finish_reason === "function_call") {
            const function_name = response.choices[0].message.function_call.name;
            console.log(`assistant: Call function ${function_name}()`)
            switch(function_name) {
                case "generate_random_number": {
                    console.log("[Calling generate_random_number function]");
                    const random_number = generate_random_number();
                    messages.push({
                        "role": "function",
                        "name": "generate_random_number",
                        "content": `${random_number}`
                    });
                }
            }
        } else if (response.choices[0].finish_reason === "stop") {
            console.log(`assistant: ${response.choices[0].message.content}`)
            break;
        }
    }
}

console.log(JSON.stringify(messages, null, 2));