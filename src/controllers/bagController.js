import Bag from "../models/Bag.js";

export const createBag = async (req, res) => {
  try {
    const bag = await Bag.create({
      name: req.body.name,
      bagColor: req.body.bagColor,
      keyFlavours: req.body.keyFlavours,
      backgroundColor: req.body.backgroundColor,
      image: req.body.image || null,
      backgroundPreset: req.body.backgroundPreset || null,
      backgroundImage: req.body.backgroundImage || null,
      user: req.user._id 
    });

    res.status(201).json(bag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// import Vote from "../models/Vote.js"

export const getBags = async (req, res) => {
  try {
    const bags = await Bag.find().populate("user", "name")
    res.json(bags)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bags" })
  }
}




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

export const getMyBags = async (req, res) => {
  try {
    const bags = await Bag.find({ user: req.user._id }).populate("user", "name")
    res.json(bags)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bags" })
  }
}

export const getAllBags = async (req, res) => {
  try {
    const bags = await Bag.find()
      .populate("user", "name")

    res.json(bags)
  } catch (err) {
    console.error("GET ALL BAGS ERROR:", err)
    res.status(500).json({ message: "Failed to fetch bags" })
  }
}