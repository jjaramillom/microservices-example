const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/post', (req, res) => {
	res.send(posts);
});

app.post('/post', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	posts[id] = { id, title };
	await axios.post('http://localhost:4005/event', {
		type: 'PostCreated',
		data: { id, title },
	});
	res.send(posts[id]);
});

app.post('/event', (req, res) => {
	res.end();
});

app.listen(4000, () => console.log('listenting on 4000 POSTS'));
