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
    let current_message = messages[messages.length-1];
    console.log(`${current_message.role}: ${current_message.content}`);

    const raw_response = await openai.chat.completions.create({
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

    if (raw_response.choices && raw_response.choices.length > 0) {
        let response = raw_response.choices[0];
        messages.push(response.message);
        if (response.finish_reason === "function_call") {
            const function_name = response.message.function_call.name;
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
        } else if (response.finish_reason === "stop") {
            console.log(`${response.message.role}: ${response.message.content}`)
            break;
        }
    }
}
