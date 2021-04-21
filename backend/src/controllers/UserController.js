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
        })

        return res.json(users);
    },
    async store(req, res) {
        const { name, email, picture } = req.body.response;

        console.log(req.body.response);

        const userExists = await User.findOne({ name: name });

        if (userExists) {
            return res.json(userExists);

        }

        const user = await User.create({
            name,
            email,
            picture: picture.data.url
        })

        return res.json(user);
    }   
}