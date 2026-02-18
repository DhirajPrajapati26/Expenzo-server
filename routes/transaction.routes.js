import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  editTransaction,
  getSummary,
  getFilter,
} from "../controllers/transaction.ctrl.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/", AuthMiddleware, createTransaction);
router.get("/", AuthMiddleware, getTransactions);
router.get("/summary", AuthMiddleware, getSummary);
router.get("/filter", AuthMiddleware, getFilter);
router.delete("/:id", AuthMiddleware, deleteTransaction);
router.put("/:id", AuthMiddleware, editTransaction);

export default router;
