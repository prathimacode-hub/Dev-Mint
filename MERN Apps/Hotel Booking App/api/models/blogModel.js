/* eslint-disable comma-dangle */
// external import
const mongoose = require('mongoose');

// Maybe update later
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        desc: {
            type: String,
        },
        view: {
            type: Number,
        },
        tags: {
            type: Array,
        },
    },
    { timestamps: true }
);

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
