import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        unique: true
    }
},
    { timestamps: true })

const User = mongoose.model("user_data", UserSchema);

export default User;