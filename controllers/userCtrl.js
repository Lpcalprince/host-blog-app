const userModel = require('../models/usreModel')
const bcrypt = require('bcrypt');
//Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'Getting All User Data',
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All User',
            error
        })
    }
};

//Create || Register Users
exports.registerCtrl = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all Filds'
            })
        }
        //Existing User
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User Already Register, Please Login'
            })
        }
        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Save New User
        const user = new userModel({
            username,
            email,
            password: hashedPassword
        })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'User Created Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Register Controller",
            success: false,
            error
        })

    }
};

//Login Users
exports.loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Login Validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Email is not Register, Please Register"
            })
        }
        //Find User is Available or Not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Email is not Register, Please Register"
            });
        }
        //Password Verification
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Username or Password"
            })
        }
        //Login Successful
        return res.status(200).send({
            success: true,
            message: 'User Login Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Login Controller',
            error
        })
    }
};

exports.userBlogCtrl = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs');
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blogs Not Found With this ID",
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Blogs Lists",
            userBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error getting in user Blogs',
            error
        })

    }
}