const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/post/:id/comment', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post('/post/:id/comment', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const postId = req.params.id;

	if (!commentsByPostId[postId]) commentsByPostId[postId] = [];

	const comment = { id: commentId, content, status: 'pending' };

	commentsByPostId[postId].push(comment);

	await axios.post('http://event-bus-srv:4005/event', {
		type: 'CommentCreated',
		data: { ...comment, postId },
	});

	res.send(commentsByPostId[postId]);
});

app.post('/event', async (req, res) => {
	const { type, data } = req.body;
	if (type === 'CommentModerated') {
		const comment = commentsByPostId[data.postId].find((comment) => comment.id === data.id);
		comment.status = data.status;

		await axios.post('http://event-bus-srv:4005/event', {
			type: 'CommentUpdated',
			data: { ...comment, postId: data.postId },
		});
	}
	res.end();
});

app.listen(4001, () => console.log('listenting on 4001 COMMENTS'));
