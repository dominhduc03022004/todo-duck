import Task from "../model/Task"

export const getAllTask = async(req, res) => {
    try {
        const tasks = await Task.find({})
        
    } catch (error) {
        
    }
}