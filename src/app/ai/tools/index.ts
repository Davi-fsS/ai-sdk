import { ToolCallUnion, ToolResultUnion } from "ai";
import { localization } from "./localization";
import { weather } from "./weather";

export type AIToolSet = ToolCallUnion<typeof tools>
export type AIToolResult = ToolResultUnion<typeof tools>

export const tools = {
    localization,
    weather
}