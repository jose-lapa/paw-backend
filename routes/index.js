const express = require('express');
var router = express.Router();

const AuthRouter = require('./authRoute');
const UserRouter = require('./UserRoute');

router.get('/', (_, res) => {
	res.sendStatus(200);
});

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

module.exports = router;