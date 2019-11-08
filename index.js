require('dotenv').config();
const express = require('express');
const postsRouter = require('./data/posts/posts-router');
const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/', (req, res) => {
  res.send(`<h1>Go to /api/posts for JSON data.</h1>`)
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})