import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json("Hello guys welcome to my server");
})

app.get('/about', (req, res) => {
    res.status(200).json({
        name: "Simple API",
        version: "1.0.0",
        description: "This is a simple about endpoint."
    });
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" });
})

app.get("/dockercompose",(req,res)=>{
    res.status(200).json({
        message: "Docker Compose endpoint",
        service: "backend",
        status: "running"
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})