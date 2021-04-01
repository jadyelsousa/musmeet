const express = require('express');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/user', UserController.index); 
routes.post('/user', UserController.store);
routes.post('/user/:userId/likes', LikeController.store);
routes.post('/user/:userId/dislikes', DislikeController.store);
 

module.exports = routes;