const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const usreModel = require('../models/usreModel');

//Get All Blogs
exports.getAllBlogCtrl = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found",
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All Blogs Lists',
            blogs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting Blogs',
            error
        })
    }
};

//Get Single Blog
exports.getSingleBlogCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: 'Blog Not Found With This ID',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Responding Single Blog',
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Getting Single Blogs.',
            error
        })
    }
};

//Create Bolg
exports.createBlogCtrl = async (req, res) => {
    try {
        const { title, discription, image, user } = req.body
        //Validation
        if (!title || !discription || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please Provide all Fields.'
            })
        }
        const existingUser = await usreModel.findById(user)
        //validation
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user'
            })
        }
        const newBlog = new blogModel({ title, discription, image, user })
        const session = await mongoose.startSession();
        session.startTransaction()
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: 'Blog Created Successfully!',
            newBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Creating Blog',
            error
        })
    }
};

//Update Bolg
exports.updateBlogCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const { title, discription, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: 'Blog Updated Successfully!',
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Updating Blogs.',
            error
        })
    }
};

//Delete Bolg
exports.deleteBlogCtrl = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: 'Blog Deleted Successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error While Deleting Blog',
            error
        })

    }
};
