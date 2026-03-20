import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import {SystemMessage,HumanMessage, AIMessage} from "langchain"

const geminiChatModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite-preview",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const geminiGemmaTitleModel=new ChatGoogleGenerativeAI({
  model: "gemma-3-27b-it",
  apiKey: process.env.GEMINI_API_KEY
});



export async function messageAi(messages) {
    const response=await geminiChatModel.invoke(messages.map((msg)=>{
        if(msg.role==="user"){
            return new HumanMessage(msg.content)
        }
        else if(msg.role==="ai"){
            return new AIMessage(msg.content)
        }
    }))
    return response.text
}

export async function createChatTitle(message) {
    const response=await geminiGemmaTitleModel.invoke([
        new HumanMessage(`
            INSTRUCTION: You are a helpful assistant that generates concise and descriptive titles (2-4 words).
            
            TASK: Generate a title for this specific message:
            "${message}"
            
            Output ONLY the title text.
        `)
    ])
    return response.text
}

