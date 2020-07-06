const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

const servicePorts = ['4000', '4001', '4002', '4003'];

const eventStore = [];

app.post('/event', (req, res) => {
	const event = req.body;
	console.log('received event', event.type);

	eventStore.push(event);

	servicePorts.forEach((port) =>
		axios
			.post(`http://localhost:${port}/event`, event)
			.catch((err) => console.log(`Error communicating with service in port ${port}`))
	);

	res.send({ status: 'OK' });
});

app.get('/event', (req, res) => {
	res.send(eventStore);
});

app.listen(4005, () => console.log('listenting on 4005 EVENT-BUS'));
