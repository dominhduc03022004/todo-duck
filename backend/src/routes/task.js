import { Router } from "express";
import { createTask, getAllTask, removeTask, updateTask } from "../controllers/task";
import { checkAuth } from "../middlewares/checkAuth";

const routerTask = Router();

routerTask.get("/", checkAuth ,getAllTask)
routerTask.post("/", checkAuth ,createTask)
routerTask.put("/:id", checkAuth ,updateTask)
routerTask.delete("/:id", checkAuth ,removeTask)

export default routerTask