const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // storing posts and comments together in memory

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log('received event:', type);

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

  res.send({}); 
});

app.listen(4002, () => {
  console.log('query service listening on post 4002');
});