const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid').v1;
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {}; // store comments in memory keyed by post id

app.get('/posts/:id/comments', (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { comment } = req.body;
  const postID = req.params.id;
  const id = uuid();
  const data = {
    id,
    comment,
    status: 'PENDING',
  };
  let postComments = comments[postID] || [];
  postComments.push(data);
  comments[postID] = postComments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {...data, postID},
  });

  res.status(201).send(postComments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('received event:', type);

  if (type === 'CommentModerated') {
    const { id, postID, status } = data;
    let commentsList = comments[postID];
    const comment = commentsList.find(c => c.id === id);
    comment.status = status;
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data,
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('comments server listening on port 4001');
});