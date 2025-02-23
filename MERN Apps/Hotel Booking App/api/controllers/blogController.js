/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
// internal import
const BlogModel = require('../models/blogModel');

//  * The function creates a new blog post and saves it to the database, returning the saved blog post if
//  * successful.
const createBlog = async (req, res) => {
    try {
        const newBlog = BlogModel(req.body);
        const savedBlog = await newBlog.save();

        res.status(200).json({
            message: savedBlog,
        });
    } catch (error) {
        res.status(500).json({
            error: `Blog not created! ${error}`,
        });
    }
};

//  * The function `updateBlog` updates a blog post in a database using the provided request parameters
//  * and body, and returns the updated blog post as a response.
const updateBlog = async (req, res) => {
    try {
        const updBlog = await BlogModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            message: updBlog,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Blog not updated!',
        });
    }
};

//  * The deleteBlog function deletes a blog post from the database and returns a success message if the
//  * deletion is successful, or an error message if it fails.
const deleteBlog = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Blog deleted successfully.',
        });
        } catch (error) {
                res.status(500).json({
                    error: 'Blog not deleted!',
                });
        }
};

//  * The function `getOneBlog` retrieves a blog from the database based on the provided ID and returns it as a JSON response.
const getOneBlog = async (req, res) => {
    try {
        const Blog = await BlogModel.findById(req.params.id);

        res.status(200).json({
            message: Blog,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Blog not found!!',
        });
        }
};

//  * The function getAllBlog retrieves all blog posts from the database and returns them as a JSON
//  * response.
const getAllBlog = async (req, res) => {
    // const { tag } = req.query;
    let allBlogs;
    try {
        // if (tag) {
        // allBlogs = await BlogModel.find({ tags: tag });
        // }
        allBlogs = await BlogModel.find();

        res.status(200).json({
            message: allBlogs,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Blogs not found!!',
        });
    }
};

//  * The function `getBlogByTag` retrieves all blogs that have a specific tag and returns them as a JSON
//  * response.
const getBlogByTag = async (req, res) => {
    const { tag } = req.query;
    try {
        const allBlogs = await BlogModel.find({ tags: tag });

        res.status(200).json({
            message: allBlogs,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Blogs not found!!',
        });
    }
};

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getOneBlog,
    getAllBlog,
    getBlogByTag,
};
