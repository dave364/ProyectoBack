import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
      type: String,
      require: true  
    },
    last_name: {
        type: String,
        require: true  
      },
      email: {
        type: String,
        require: true, 
        unique: true
      },
      dni: Number,
      birth_Date: Date,
      gender: {
        type: String,
        enum: ["M","F"]
      },
      courses: {
        type: Array,
        default: []
      }
})

export const userModel = mongoose.model(userCollection, userSchema)