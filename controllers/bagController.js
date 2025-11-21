import Bag from "../models/Bag.js";

export const createBag = async (req, res) => {
  try {
    const bag = await Bag.create(req.body);
    res.json(bag);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getBags = async (req, res) => {
  const bags = await Bag.find();
  res.json(bags);
};

export const getBag = async (req, res) => {
  const bag = await Bag.findById(req.params.id);
  res.json(bag);
};

export const updateBag = async (req, res) => {
  const bag = await Bag.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(bag);
};

export const deleteBag = async (req, res) => {
  await Bag.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};
