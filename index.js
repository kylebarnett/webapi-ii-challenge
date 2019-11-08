require('dotenv').config();
const express = require('express');
const postsRouter = require('./data/posts/posts-router');
const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})