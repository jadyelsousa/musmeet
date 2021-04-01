const { response } = require('express');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const userId = req.params.userId;
        const user = req.headers.user;

        const loggedUser = await User.findById(user);
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(400).json({ error: 'User not exists' });
        }
  
        loggedUser.dislikes.push(targetUser._id);
        await loggedUser.save();

        return res.json({ loggedUser })
    }
}
