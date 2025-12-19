import Vote from "../models/Vote.js";
import Bag from "../models/Bag.js"

export const addVote = async (req, res) => {
  console.log("REQ.USER:", req.user)

  try {
    const bagId = req.params.bagId;
    const userId = req.user._id;

    const vote = await Vote.create({ 
      user: userId, 
      bag: bagId 
    });
    await Bag.findByIdAndUpdate(bagId, {
      $inc: { votes: 1 }
    });
    res.status(201).json(vote);
  } catch (err) {
    // duplicate key -> user heeft al gestemd
    if (err.code === 11000) {
      return res.status(400).json({ message: "You already voted for this bag" });
    }
    res.status(500).json({ message: "Add vote failed", error: err.message });
  }
};

export const removeVote = async (req, res) => {
  try {
    const bagId = req.params.bagId;
    const userId = req.user.id;

    await Vote.findOneAndDelete({ user: userId, bag: bagId });
    res.json({ message: "Vote removed" });
  } catch (err) {
    res.status(500).json({ message: "Remove vote failed", error: err.message });
  }
};

export const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate("user", "email")
      .populate("bag", "name");
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: "Get votes failed", error: err.message });
  }
};

export const getVotesForBag = async (req, res) => {
  const votes = await Vote.countDocuments({ bag: req.params.bagId })
  res.json({ votes })
}