import Bag from "../models/Bag.js";

export const createBag = async (req, res) => {
  try {
    const image = req.files?.image?.[0]?.path || null;
    const backgroundImage = req.files?.backgroundImage?.[0]?.path || null;

    const bag = await Bag.create({
      name: req.body.name,
      bagColor: req.body.bagColor,
      keyFlavours: Array.isArray(req.body.keyFlavours)
      ? req.body.keyFlavours
      : JSON.parse(req.body.keyFlavours || "[]"),
      backgroundColor: req.body.backgroundColor,
      image,
      backgroundImage
    });

    res.status(201).json(bag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBags = async (req, res) => {
  const bags = await Bag.find();
  res.json(bags);
};

export const getBagById = async (req, res) => {
  const bag = await Bag.findById(req.params.id);
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
