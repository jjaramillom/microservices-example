const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = ({ type, data }) => {
	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}
	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data;
		posts[postId].comments.push({ id, content, status });
	}

	if (type === 'CommentUpdated') {
		const { id, content, postId, status } = data;
		let comment = posts[postId].comments.find((comment) => comment.id === id);
		comment.status = status;
		comment.content = content;
	}
};

app.get('/post', (req, res) => {
	res.send(posts);
});

app.post('/event', (req, res) => {
	handleEvent(req.body);

	res.end();
});

app.listen(4002, async () => {
	console.log('listenting on 4002 QUERY');
	const res = await axios.get('http://localhost:4005/event');
	for (let event of res.data) {
		console.log('Processing event:', event.type);
		handleEvent(event);
	}
});
