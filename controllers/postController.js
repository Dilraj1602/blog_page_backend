

const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try{
        const{title,body} = req.body;

        const post = new Post({
            title,
            body
        });

        const savePost = await post.save();
        console.log(savePost);

        res.json({
            post:savePost
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error:'Server Error Occurred'
        });
    }
}