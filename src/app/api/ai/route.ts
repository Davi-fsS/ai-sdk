import { NextRequest } from "next/server";
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { tools } from "@/app/ai/tools";

export async function POST(request: NextRequest){
    const { messages } = await request.json()

    const result = await streamText({
        model: openai("gpt-4o"),
        tools,
        messages,
        maxSteps: 5,
        // toolChoice: "required",     // limita que a resposta seja somente sobre as tools
        system: `
            Sempre responda em markdown sem aspas no início e no fim da sua mensagem
        `,

        onStepFinish({ toolResults }) {
            console.log(toolResults)
        }
    })

    console.log("resultado: ", result.toDataStreamResponse())
    return result.toDataStreamResponse()
}