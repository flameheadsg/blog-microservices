const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid').v1;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {}; // store comments in memory keyed by post id

app.get('/posts/:id/comments', (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const { comment } = req.body;
  const postID = req.params.id;
  const id = uuid();
  let postComments = comments[postID] || [];
  postComments.push({
    id,
    comment,
  });
  comments[postID] = postComments;
  res.status(201).send(postComments);
});

app.listen(4001, () => {
  console.log('comments server listening on port 4001');
});