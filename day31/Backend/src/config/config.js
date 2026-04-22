import { configDotenv } from "dotenv";

configDotenv()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI not found");
}

export const envConfig={
    MONGO_URI:process.env.MONGO_URI
}