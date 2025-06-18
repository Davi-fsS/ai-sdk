import { NextRequest, NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { generateText, streamText, tool } from 'ai';
import z from "zod";

export async function POST(request: NextRequest){
    const { messages } = await request.json()

    const result = await streamText({
        model: openai("gpt-4o"),
        tools: {
            localizationData: tool({
                description: "Essa ferramenta serve para buscar dados geográficos de uma cidade, como as cordenadas, nome do munícipo, estado, região e país.",
                parameters: z.object({
                    city: z.string().describe("nome da cidade")
                }),
                execute: async({ city }) => {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=jsonv2`)

                    const data = await response.json()
      
                    return JSON.stringify(data)
                }
            }),
            getWeather: tool({
                description: "Essa ferramenta serve para inferir informações climáticas dado coordenadas",
                parameters: z.object({
                    latitude: z.number().describe("latitude da cidade"),
                    longitude: z.number().describe("longitude da cidade")
                }),
                execute: async ({ latitude, longitude }) => {
                    const API_KEY = "ecf32be23a189cb0b86bd0ab11e82cf3"
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
                    const data = await response.json()
        
                    return JSON.stringify(data)
                }
            })
        },
        messages,
        maxSteps: 5,
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