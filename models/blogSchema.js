import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from './userSchema.js';

const blogSchema = new Schema({
    title: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    likes: {
        type: Number
    }
});


const blog = mongoose.model('blog', blogSchema);
export default blog;
