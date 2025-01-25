import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getRelatedUsers, sendMessage } from "../controllers/message.controller.js";

const router = Router()


// Get Users
router.get("/users", protectRoute, getRelatedUsers)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)

export default router