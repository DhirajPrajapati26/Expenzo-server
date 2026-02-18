import mongoose from "mongoose";

const EXPENSE_CATEGORIES = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Gift",
  "Other",
];

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      trim:true
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be positive"],
    },
    category: {
      type: String,
      required: true,
      enum: [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES],
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "UPI", "BANK"],
      default: "CASH",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("transaction_data", TransactionSchema);

export default Transaction;
