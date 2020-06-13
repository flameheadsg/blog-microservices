const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('received event:', type);

  if (type === 'CommentCreated') {
    const {
      id,
      postID,
      comment,
    } = data;
    const status = comment.includes('profanity') ? 'REJECTED' : 'APPROVED';
    await axios.post('http://events-srvc:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postID,
        comment,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('moderator service listening on port 4003');
});