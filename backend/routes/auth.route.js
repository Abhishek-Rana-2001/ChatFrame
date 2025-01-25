import { Router } from "express";
import { checkAuth, login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/signup",register)
router.post("/login", login)
router.post("/logout", logout)
router.put("/updateProfile",protectRoute, updateProfile)


router.get("/check", protectRoute, checkAuth)



export default router