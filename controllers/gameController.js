require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Clicks = require('../models/Clicks');

const addUser = async (req, res) => {
    try {
        const userExists = await User.findOne({username: req.body.username});
        if (!userExists) {
            const user = new User({
                username: req.body.username,
                points: 20
            });

            const savedUser = await user.save();
            const token = jwt.sign({username: savedUser.username, id: savedUser._id}, process.env.SECRET_KEY);
            res.json({user: savedUser, token: token});
        } else {
            res.json({message: 'User already exists!'});
        }
    } catch (error) {
      console.log('addUser error: ', error.message);  
    }   
};

const updateGame = async (req, res) => {
    try {
        await User.findOneAndUpdate({username: req.user.username}, {points: req.body.points});
        const user = await User.findOne({username: req.user.username});
        const newClick = new Clicks({
            username: user.username
        });
        await newClick.save();
        const clicks = await Clicks.find();
        res.json({user: user, clicks: clicks});
    } catch (error) {
        console.log('updateUser error: ', error.message);
    }
};

const getGameStatus = async (req, res) => {
    try {
        const user = await User.findOne({username: req.user.username});
        const clicks = await Clicks.find();
        res.json({user: user, clicks: clicks});
    } catch (error) {
        console.log('getUser error: ', error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const delUser = await User.findOneAndDelete({username: req.user.username});
        if (delUser) {
            res.json({message: 'success'});
        } else {
            res.json({message: 'Failed to delete user!'})
        }
    } catch (error) {
        console.log('deleteUser error: ', error.message);
    }
};

module.exports = {
    addUser,
    getGameStatus,
    updateGame,
    deleteUser
}