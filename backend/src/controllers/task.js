import Task from "../model/Task";
import User from "../model/User";

export const getAllTask = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};
  try {
    const userId = req.userId;
    const result = await Task.aggregate([
      {
        $match: { userId, ...query },
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;
    return res.status(200).json({
      tasks,
      activeCount,
      completeCount,
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
    await User.updateOne(
      { tasks: req.params.id },
      { $pull: { tasks: req.params.id } }
    );
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
