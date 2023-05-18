import { userModel } from "../modeLs/users.js";

export default class Users {
    constructor() {
        console.log("working users with DB");
    }

    getAll = async () => {
        const users = await userModel.find();
        return users.map(user=>user.toObject());
    }

    save = async (user) => {
        const result = await userModel.create(user);
        return result;
    }
}