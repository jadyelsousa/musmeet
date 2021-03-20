const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { name, email, picture } = req.body.response;

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