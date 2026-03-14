import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {
    await model.invoke("Difference between AI & ML in 100 words")
    .then((response)=>{
        console.log(response.text)
    })
}