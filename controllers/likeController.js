exports.dummyLink = (req, res) => {
    res.send('Dummy Like Controller');
}

const mongoose = require('mongoose');
const Like = require('../models/likeModel');
const Post = require('../models/postModel'); 

exports.createLike = async (req, res) => { // Renamed to "createLike"
    try {
        const { post: postId, user } = req.body; 
        const like = new Like({
            post: postId,
            user
        });
        const savelike = await like.save();
        console.log(savelike); // Corrected the variable name

        const updatedPost = await Post.findByIdAndUpdate(postId, {
            $push: {
                likes: savelike._id,
            }
        }, { new: true })
        .populate('likes')
        .exec();

        res.json({
            post: updatedPost,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Server Error Occurred'
        });
    }
};

exports.createUnlike = async (req, res) => {
    try{
        const {post: postId, user} = req.body;
        const like = await Like.findOne({post:postId, user:user});

        if(!like){
            return res.status(400).json({
                error:'Like not found'
            });
        }

        const deleteLike = await Like.findByIdAndDelete(like._id);
        console.log(deleteLike);

        const updatedPost = await Post.findByIdAndUpdate(postId,{
            $pull:{
                likes:deleteLike._id
            }
        },{new:true})
        .populate('likes')
        .exec();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error:'Server Error Occurred'
        });
    }
}
