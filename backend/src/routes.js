const express = require('express');
const multer = require('multer')
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const multerConfig = require('./config/multer');

const routes = express.Router();

routes.get('/user', UserController.index); 
routes.post('/login', UserController.create);
routes.post('/register', multer(multerConfig).single('image'),UserController.store);
routes.get('/userMeet', UserController.show); 
routes.post('/user/:userId/likes', LikeController.store);
routes.post('/user/:userId/dislikes', DislikeController.store);
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
 

module.exports = routes;