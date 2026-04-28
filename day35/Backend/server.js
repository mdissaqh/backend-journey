import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json("Hello guys welcome to my server");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})