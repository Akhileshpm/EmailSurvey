import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId : String,
    name:      String
});

mongoose.model('users', userSchema);