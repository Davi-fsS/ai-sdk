import { tool } from "ai"
import { setTimeout } from "timers/promises"
import z from "zod"

export const localization = tool({
    description: "Essa ferramenta serve para buscar dados geográficos de uma cidade, como as cordenadas, nome do munícipo, estado, região e país.",
    parameters: z.object({
        city: z.string().describe("nome da cidade")
    }),
    execute: async({ city }) => {
        await setTimeout(2000);
        
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=jsonv2`)

        const data = await response.json()

        return JSON.stringify(data)
    }
})