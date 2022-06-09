const User = require('../models/User');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        
        const loggedUser = await User.findById(user);

        // const users = await User.find({
        //     $and :[
        //         {_id : { $ne : user}},
        //         {_id : {$nin : loggedUser.likes}}, 
        //         {_id : {$nin : loggedUser.dislikes}},
        //     ],
        // }).populate('category');

        return res.json(loggedUser);
    },

    async show(req, res) {
        const { user } = req.headers;
        
        const loggedUser = await User.findById(user);

        const users = await User.find({
            $and :[
                {_id : { $ne : user}},
                {_id : {$in : loggedUser.likes}}, 
                
            ],
        })
        
        return res.json(users);
    },

    async create(req, res) {
        const { name } = req.body.response;

        const userExists = await User.findOne({ name: name });

        if (userExists) {
            return res.json(userExists);

        } else {
            return res.json(null);
        }
        
    },

    async store(req,res){
        const {name, email, phone, bio, category} = req.body;
        const { filename: image} = req.file;

        await sharp(req.file.path)
            .resize(500, 500)
            .jpeg({quality:70})
            .toFile(
                path.resolve(req.file.destination, 'uploads', image)
            )

        fs.unlinkSync(req.file.path);
        
        let categories = category.split(',');

        const user = await User.create({
            name,
            email,
            image,
            phone,
            bio,
            
        });
           
           categories.map( categoriId => {
           user.category.push(categoriId);
        
           });

        await user.save();

        return res.json(user);       
    },
    
    async filter(req, res) {
        const userId = req.params.userId;
        const { category: categoryId } = req.body;
    

        const users = await User.find({
            $and :[
                {_id : { $ne : userId}},
                {category : {$in : categoryId}},
                
            ],
        }).populate('category');

        return res.json(users);   

    }
}