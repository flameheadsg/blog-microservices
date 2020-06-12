const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // storing posts and comments together in memory

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const {
      id,
      postID,
      comment,
      status,
    } = data;
    posts[postID].comments.push({
      id,
      comment,
      status,
    });
  }

  if (type === 'CommentUpdated') {
    const {
      id,
      postID,
      comment,
      status,
    } = data;
    const commentRef = posts[postID].comments.find(c => c.id === id);
    commentRef.comment = comment;
    commentRef.status = status;
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('received event:', type);
  handleEvent(type, data);

  res.send({}); 
});

app.listen(4002, async () => {
  console.log('query service listening on post 4002');
  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    console.log('processing event:', event.type);
    handleEvent(event.type, event.data);
  }
});