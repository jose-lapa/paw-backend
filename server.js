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
const ATLAS_URI = `mongodb+srv://JOSE:DBADMJOSE@pawcluster-tdxbw.azure.mongodb.net/COVIDRECURSO?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('Connected to MongoDB Atlas.'))
	.catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use('/v1', AppRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log('Server now running.'));