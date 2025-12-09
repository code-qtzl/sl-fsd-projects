let express = require('express');
let axios = require('axios');
let app = express();

app.get('/callFakeAPI', async (req, res) => {
	// res.send('Welcome to the fake API');
	try {
		let result = await axios.get('https://dummyjson.com/products');
		// console.log('msg');
		res.json({ 'Response:': result.data.products });
	} catch (error) {
		res.status(500).send('Error calling the fake API: ', error);
	}
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
