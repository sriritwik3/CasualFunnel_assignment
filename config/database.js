import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const password = process.env.MONGO_PASS;
const url = `mongodb+srv://ritwik:${password}@cluster0.9sv0dcp.mongodb.net/?retryWrites=true&w=majority`;
mongoose
    .connect(url)
    .then(() => {
        console.log('connected to database succesfully.');
    })
    .catch((err) => {
        console.log(err);
    });
