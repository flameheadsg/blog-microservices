const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid').v1;
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // store posts in memory

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const { title } = req.body;
  const id = uuid();
  const data = {
    id,
    title,
  };
  posts[id] = data;

  await axios.post('http://events-srvc:4005/events', {
    type: 'PostCreated',
    data,
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('received event:', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('posts server listening on port 4000');
});