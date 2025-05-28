const express = require('express');
const app= express();
const port = 3000;
const postRouter = require('./routers/posts');



//middleware richieste neel body
app.use(express.json());

//middleware asset statici
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/posts', postRouter); 

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta:${port}`);
});