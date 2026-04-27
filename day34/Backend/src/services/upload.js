import ImageKit from "@imagekit/nodejs"
import { envConfig } from "../config/config.js"

const client= new ImageKit({
    privateKey: envConfig.IMAGE_KIT_PRIVATE_KEY
})

export async function uploadImage({buffer,fileName,folder="Snitch/products"}){
    try {
        const response=await client.files.upload({
            file: await ImageKit.toFile(buffer),
            fileName,
            folder
        })
        console.log(response)
        return response.url
    } catch (error) {
        console.error("Error uploading image:", error)
        throw new Error("Failed to upload image")
    }
}