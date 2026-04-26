import { configDotenv } from "dotenv";

configDotenv()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not found");
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not found");
}
if(!process.env.IMAGE_KIT_PRIVATE_KEY){
    throw new Error("IMAGE_KIT_PRIVATE_KEY not found");
}

export const envConfig={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY
}