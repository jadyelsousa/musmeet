const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        
        const loggedUser = await User.findById(user);

        const users = await User.find({
            $and :[
                {_id : { $ne : user}},
                {_id : {$nin : loggedUser.likes}}, 
                {_id : {$nin : loggedUser.dislikes}},
            ],
        }).populate('category');

        return res.json(users);
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
    }
}