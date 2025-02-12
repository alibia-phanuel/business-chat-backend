import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController";
// import { verifyUser } from "../middleware/authUser";
const router = express.Router();
router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);
export default router;
