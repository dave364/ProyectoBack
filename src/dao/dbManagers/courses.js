import { courseModel } from "../modeLs/courses.js";

export default class Courses {
    constructor() {
        console.log("working courses with DB");
    }

    getAll = async () => {
        const courses = await courseModel.find().lean();
        return courses;
    }

    save = async (course) => {
        const result = await courseModel.create(course);
        return result
    }

    update = async (id, course) => {
        const result = await courseModel.updateOne({_id: id}, course)
        return result;
    }
}