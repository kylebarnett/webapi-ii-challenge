const express = require('express');
const postsRouter = require('./data/posts/posts-router');
const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.listen(4000, () => {
  console.log('Listening on port 4000')
})