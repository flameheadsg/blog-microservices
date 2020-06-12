const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid').v1;

const app = express();
app.use(bodyParser.json());

const posts = {}; // store posts in memory

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { title } = req.body;
  const id = uuid();
  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('posts server listening on port 4000');
});