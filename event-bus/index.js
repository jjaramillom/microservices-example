const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// const servicePorts = ['4000', '4001', '4002', '4003'];
const services = ['posts-clusterip-srv:4000', 'comments-srv:4001', 'query-srv:4002', 'moderation-srv:4003'];


const eventStore = [];

app.post('/event', (req, res) => {
	const event = req.body;
	console.log('received event', event.type);

	eventStore.push(event);

	services.forEach((service) =>
		axios
			.post(`http://${service}/event`, event)
			.catch((err) => console.log(`Error communicating with service => ${service}`))
	);

	res.send({ status: 'OK' });
});

app.get('/event', (req, res) => {
	res.send(eventStore);
});

app.listen(4005, () => console.log('listenting on 4005 EVENT-BUS'));
