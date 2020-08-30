const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/event', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    // console.log('data moderation ', data);

    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    setTimeout(
      async () =>
        await axios.post('http://event-bus-srv:4005/event', {
          type: 'CommentModerated',
          data: { ...data, status },
        }),
      5000
    );
  }

  res.end();
});

app.listen(4003, () => console.log('listenting on 4003 MODERATION'));
