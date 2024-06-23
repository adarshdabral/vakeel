import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Check if the User model already exists to avoid overwriting
const User = models.User || model('User', userSchema);

export default User;