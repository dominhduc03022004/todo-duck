import Task from "../model/Task";
import User from "../model/User";

export const getAllTask = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId });
    if (!tasks || tasks.length === 0) {
      return res.status(400).json({
        message: "Không có nhiệm vụ nào",
      });
    }
    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId: ", userId);
    const user = req.user;
    console.log("user: ", user);
    // check user
    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại, không thể tạo task",
      });
    }
    // create task
    const task = await Task.create({ ...req.body, userId });
    // gan vao user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { tasks: task._id },
    });
    return res.status(200).json({
      message: "Tạo task thành công",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({
        message: "Update task không thành công",
      });
    }
    return res.status(200).json({
      message: "Update task thành công",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Không tìm thấy task",
      });
    }
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
