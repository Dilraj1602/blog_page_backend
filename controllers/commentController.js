const mongoose = require('mongoose');

const Comment = require('../models/commentModel');
const Post = require('../models/postModel'); 

exports.createComment = async (req, res) => {
    try {
        const { post: postId, user, body } = req.body; 
        const comment = new Comment({
            post: postId,
            user,
            body
        });
        const savecomment = await comment.save();
        console.log(savecomment);

        const updatedPost = await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: savecomment._id,
            }
        }, { new: true })
        .populate('comments')
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
