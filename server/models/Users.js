// this moudle to descripe users collection in mern project db

import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        age:
        {
            type: Number,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
    }
)
const UserModel = mongoose.model("users", UserSchema) // .model(collection,schema)

export default UserModel