const express = require('express');
const LikeController = require('./controllers/LikeController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.post('/user/:userId/likes', LikeController.store);

module.exports = routes;