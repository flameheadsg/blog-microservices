const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

// endpoint publishes events to various services
app.post('/events', async (req, res) => {
  console.log('received event:', req.body.type);
  const event = req.body;
  events.push(event);

  await axios.post('http://localhost:4000/events', event); // posts
  await axios.post('http://localhost:4001/events', event); // comments
  await axios.post('http://localhost:4002/events', event); // query
  await axios.post('http://localhost:4003/events', event); // moderator
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('event bus listening on port 4005');
});