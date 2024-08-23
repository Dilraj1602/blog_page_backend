

const express = require('express');
const router = express.Router();

const {dummyLink} =require('../controllers/likeController');
const {createComment} = require('../controllers/commentController');
const {createLike} = require('../controllers/likeController');
const {createPost} = require('../controllers/postController');
const {createUnlike} = require('../controllers/likeController');

router.post('/comments/create',createComment);
router.post('/likes/create',createLike);
router.post('/unlikes/create',createUnlike);
router.post('/posts/create',createPost);
router.get('/dummyroute',dummyLink);

module.exports = router;