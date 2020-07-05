const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

const AppRouter = require('./routes/index');
const app = express();

/**
 * Mongoose connection being established
 */
const ATLAS_URI = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_KEY}`
	+ `@pawcluster-tdxbw.azure.mongodb.net/${process.env.ATLAS_NAME}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;

mongoose.connect(ATLAS_URI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB ATLAS Cluster...'))
	.catch((err) => console.error(err));
	
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use('/v1', AppRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => console.log('Server now running...\nAttemping connection to MongoDB ATLAS...'));