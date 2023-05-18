import mongoose from "mongoose";

const courseCollection = "courses";

const courseSchema = new mongoose.Schema({
    first_name: {
      type: String,
      require: true  
    },
    last_name: {
        type: String,
        require: true  
      },
      teacher: {
        type: String,
        require: true, 
      },
      students: {
        type: Array,
        default: []
      }
})

export const courseModel = mongoose.model(courseCollection, courseSchema)