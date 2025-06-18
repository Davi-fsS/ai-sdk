import { tool } from "ai"
import { setTimeout } from "timers/promises"
import z from "zod"

export const weather = tool({
    description: "Essa ferramenta serve para inferir informações climáticas dado coordenadas",
    parameters: z.object({
        latitude: z.number().describe("latitude da cidade"),
        longitude: z.number().describe("longitude da cidade")
    }),
    execute: async ({ latitude, longitude }) => {
        await setTimeout(2000);

        const API_KEY = process.env.WEATHER_KEY
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        const data = await response.json()

        return JSON.stringify(data)
    }
})