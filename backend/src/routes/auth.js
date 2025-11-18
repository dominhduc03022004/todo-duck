import { Router } from "express";
import { getProfileUser, signIn, signUp } from "../controllers/auth";
import { checkAuth } from "../middlewares/checkAuth";

const routerAuth = Router();

routerAuth.post("/signup", signUp);
routerAuth.post("/signin", signIn);
routerAuth.get("/me", checkAuth, getProfileUser);

export default routerAuth;
