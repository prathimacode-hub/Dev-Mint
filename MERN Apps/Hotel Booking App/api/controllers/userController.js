/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
// external import
const jwt = require('jsonwebtoken');

// internal import
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

/**
 * The `signup` function checks if an email already exists in the database, and if not, it hashes the
 * password and saves a new user with the provided email and password.
 */
const signup = async (req, res) => {
    const isEmail = await UserModel.findOne({ email: req.body.email });
    if (!isEmail) {
        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const newuser = new UserModel({
                ...req.body,
                password,
            });

            await newuser.save();
            res.status(200).json({
                message: 'signup successful',
            });
        } catch (error) {
            res.status(500).json({
                error,
            });
        }
    } else {
        res.status(500).json({
            error: 'Email already in use!',
        });
    }
};

/**
 * The `login` function is an asynchronous function that handles the authentication process for a user
 * logging in, including checking the user's email and password, generating a JWT token, and sending a
 * response with the token and user details.
 */
const login = async (req, res) => {
    try {
        const isUser = await UserModel.find({ email: req.body.email });
        if (isUser) {
            const comparePassword = await bcrypt.compare(req.body.password, isUser[0].password);
            if (comparePassword) {
                // jwt process

                /* The line `const { password, isadmin, ...userDetail } = isUser[0]._doc;` is using
                object destructuring to extract the `password` and `isadmin` properties from the
                `isUser[0]._doc` object. It also creates a new object called `userDetail` that
                contains all the remaining properties of `isUser[0]._doc` except for `password` and
                `isadmin`. */
                const { password, isadmin, ...userDetail } = isUser[0]._doc;
                const jwtToken = jwt.sign(
                    { id: isUser._id, isadmin: isUser.isadmin, email: isUser.email },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '3d',
                    },
                );
                res.cookie('access_token', jwtToken, {
                    httpOnly: true,
                }).status(200).json({
                    message: { details: { ...userDetail }, isadmin },
                    jwtToken,
                });
            } else {
                res.status(500).json({
                    error: 'Incorrect email or password!',
                });
            }
        } else {
            res.status(500).json({
                error: 'Authentication failed!',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Authentication failed!!',
        });
    }
};

// find user by userId and update
/**
 * The updateUser function updates a user in the database and returns the updated user as a response
 */
const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
                    $set: req.body,
                },
                { new: true },
        );

        res.status(200).json({
            message: user,
        });
    } catch (error) {
        res.status(500).json({
            error: 'User not updated!',
        });
    }
};

/**
 * The deleteUser function deletes a user from the database and returns a success message if the user
 * is found, otherwise it returns an error message.
 */
const deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'User Deleted Successfully',
        });
    } catch (error) {
        res.status(500).json({
            error: 'User not found!',
        });
    }
};

/**
 * The function `getOneUser` retrieves a user from the database by their ID and returns it as a JSON
 * response, or returns an error message if the user is not found.
 */
const getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);

        res.status(200).json({
            message: user,
        });
    } catch (error) {
        res.status(500).json({
            error: 'User not found!',
        });
    }
};

// find a user by userId
const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json({
            message: users,
        });
    } catch (error) {
        res.status(500).json({
            error: 'User not found!',
        });
    }
};

module.exports = {
    signup,
    login,
    updateUser,
    deleteUser,
    getOneUser,
    getAllUser,
};
