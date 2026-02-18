import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { note, type, category, paymentMethod, amount, date } = req.body;

    if (!category || !amount || !type) {
      res.status(400).json({ message: "Please provide all required fields" });
    }

    const transaction = await Transaction.create({
      note,
      type,
      category,
      paymentMethod,
      amount,
      date,
      userId: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
    res.status(400).json({ message: "Failed to create transaction" });
  }
};

export const getTransactions = async (req, res) => {
  try {
   
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
    // res.status(400).json({ message: "Failed to fetch transaction" })
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    // console.log(req.params.id);
    await Transaction.findByIdAndDelete(req.params.id);
    // console.log(transaction);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete Task" });
  }
};

export const editTransaction = async (req, res) => {
  try {
    const { note, type, category, paymentMethod, amount, date } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    res.status(200).json(transaction);
  } catch (error) {
    res.status(401).json({ message: "Failed to update transaction" });
  }
};

export const getSummary = async (req, res) => {
  const { month, year } = req.query;

  const end = new Date(year, month, 1);
  const start = new Date(year, month - 1, 1);

  const transactions = await Transaction.find({
    userId: req.user.id,
    date: { $gte: start, $lt: end },
  });

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  res.json({
    income,
    expense,
    balance: income - expense,
  });
};

export const getFilter = async (req, res) => {
  const { type, category } = req.query;

  const transactions = await Transaction.find({
    userId: req.user.id,
  });

  const trans = transactions.filter((t) => {
    const matchType = type === "all" || t.type === type;
    const matchCategory = category === "all" || t.category === category;

    return matchType && matchCategory;
  });

  res.json(trans);
};
