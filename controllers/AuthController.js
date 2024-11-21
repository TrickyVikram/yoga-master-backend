const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Book = require('../models/classModel');


// Register a new user
const registerUser = async (req, res) => {

    console.log("registerUser");
    console.log(JSON.stringify(req.body))
    const { name, email, password, confirmPassword ,phoneNumber,address,city,country,gender} = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            city,
            country,
            gender,

        });
        res.status(201).json({
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};


// Login a user
const loginUser = async (req, res) => {

    console.log("loginUser");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                token: generateToken(user._id),
            });

        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('purchaseClasses', 'name');
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                image: user.image,
                purchaseClasses: user.purchaseClasses,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {

    console.log("user update controller work")

    console.log(req.body);
    const { name, email, phone, address } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        // If a new image is uploaded, update the image field
        if (req.file) {
            user.image = req.file.path;
        }

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            image: user.image,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};