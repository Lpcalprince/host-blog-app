const express = require('express');
const { getAllBlogCtrl,
    getSingleBlogCtrl,
    createBlogCtrl,
    updateBlogCtrl,
    deleteBlogCtrl
} = require('../controllers/blogCtrl');
const { userBlogCtrl } = require('../controllers/userCtrl');

//Router Object
const router = express.Router();

//Blog Routes
//Get All Blogs|| GET
router.get('/all-blog', getAllBlogCtrl);

//Get Single Blogs|| GET
router.get('/get-blog/:id', getSingleBlogCtrl);

//Create Blog || POST
router.post('/create-blog', createBlogCtrl);

//Update Blog || PUT
router.put('/update-blog/:id', updateBlogCtrl);

//Delete Blog|| DELETE
router.delete('/delete-blog/:id', deleteBlogCtrl);

//Get User Blog|| GET
router.get('/user-blog/:id', userBlogCtrl);

module.exports = router