import { PDFParse } from "pdf-parse";
import fs from 'fs'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai"
import "dotenv/config"
import { Pinecone } from '@pinecone-database/pinecone'
import { json, text } from "stream/consumers";
import { log } from "console";

// let pdfDataBuffer=fs.readFileSync("./story.pdf")

// const parser=new PDFParse({
//     data:pdfDataBuffer
// })
// const data=await parser.getText()

const embeddings=new MistralAIEmbeddings({
    model:"mistral-embed",
    apiKey:process.env.MISTRAL_API_KEY
})

const pc = new Pinecone({ apiKey:process.env.PC_API_KEY})
const index=pc.Index("cohort-2-rag")

// const splitters=new RecursiveCharacterTextSplitter({chunkSize:500,chunkOverlap:0})
// const texts=await splitters.splitText(data.text)


// const docs=await Promise.all(texts.map(async (text)=>{
//     const embedding=await embeddings.embedQuery(text)
//     return {
//         text,
//         embedding
//     }
// }))

// const result=await index.upsert({
//     records:docs.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc.embedding,
//         metadata:{
//             text:doc.text
//         }
//     }))
// })

// console.log(result)

const queryEmbedding=await embeddings.embedQuery("What is reality of office life")

const res=await index.query({
    vector:queryEmbedding,
    topK:3,
    includeMetadata:true
})

console.log(JSON.stringify(res))