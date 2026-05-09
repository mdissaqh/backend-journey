import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    let sum = 0;
  for( let i=0; i<100000; i++) {
    sum += i;
  }
  res.send(`The Sum is: ${sum}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});