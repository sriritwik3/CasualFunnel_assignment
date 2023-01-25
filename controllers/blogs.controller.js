import Blog from '../models/blogSchema.js';
import User from '../models/userSchema.js';

export const getAllBlogs = (req, res, next) => {
    const { page = 1, limit = 5 } = req.query;
    Blog.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

export const addNewBlog = async(req, res, next) => {
    const reqBody = req.body;
    if (!reqBody.title) {
        res.status(400).json({ error: err.message });
        return;
    }
    const newBlog = await new Blog(reqBody);
    const Blogs = await Blog.find({});
    //newBlog.id = Blogs[Blogs.length - 1].id + 1;
    const Author = await User.findOne({ email: req.user });
    newBlog.author = Author._id;
    await newBlog.save();
    res
        .status(201)
        .json({ title: newBlog.title, id: newBlog.id, category: newBlog.category, description: newBlog.description });
};

export const updateBlogByID = async(req, res, next) => {
    const id = req.params.id;
    const blog = await Blog.findOneAndUpdate({ id }, req.body, { new: true });
    res
        .status(200)
        .json({
            title: blog.title,
            id: blog.id,
            category: blog.category,
            description: blog.description,
        });
};

export const getIndividualID = (req, res, next) => {
    const id = req.params.id;
    Blog.find({ id })
        .then((data) => {
            res.status(200).json(data[0]);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

export const deleteBlogByID = async(req, res, next) => {
    const id = req.params.id;
    const blog = await Blog.findOneAndDelete({ id });
    if (blog) {
        res.status(200).json({ msg: 'deleted succesfully' });
        return;
    }
    res.status(400).send({ msg: 'couldn find a Blog with that id' });
};
