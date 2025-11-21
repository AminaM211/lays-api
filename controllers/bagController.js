import Bag from "../models/Bag.js";

export const createBag = async (req, res) => {
  try {
    const bag = await Bag.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(bag);
  } catch (err) {
    res.status(500).json({ message: "Create bag failed", error: err.message });
  }
};

export const getBags = async (req, res) => {
  const bags = await Bag.find().populate("user", "email");
  res.json(bags);
};

export const getBagById = async (req, res) => {
  const bag = await Bag.findById(req.params.id).populate("user", "email");
  if (!bag) return res.status(404).json({ message: "Bag not found" });
  res.json(bag);
};

export const updateBag = async (req, res) => {
  const bag = await Bag.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bag) return res.status(404).json({ message: "Bag not found" });
  res.json(bag);
};

export const deleteBag = async (req, res) => {
  await Bag.findByIdAndDelete(req.params.id);
  res.json({ message: "Bag deleted" });
};
