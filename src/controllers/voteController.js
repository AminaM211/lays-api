import Vote from "../models/Vote.js"
import Bag from "../models/Bag.js"

// -----------------------------
// ADD VOTE
// -----------------------------
export const addVote = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const { bagId } = req.params
    const userId = req.user._id

    const existing = await Vote.findOne({ user: userId, bag: bagId })
    if (existing) {
      return res.status(400).json({ message: "Already voted" })
    }

    // vote opslaan
    await Vote.create({ user: userId, bag: bagId })

    // votes +1
    const bag = await Bag.findByIdAndUpdate(
      bagId,
      { $inc: { votes: 1 } },
      { new: true }
    )

    res.json({ votes: bag.votes })
  } catch (err) {
    res.status(500).json({
      message: "Add vote failed",
      error: err.message
    })
  }
}

// -----------------------------
// REMOVE VOTE
// -----------------------------
export const removeVote = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const { bagId } = req.params
    const userId = req.user._id

    const deleted = await Vote.findOneAndDelete({ user: userId, bag: bagId })
    if (!deleted) {
      return res.status(400).json({ message: "No vote to remove" })
    }

    const bag = await Bag.findByIdAndUpdate(
      bagId,
      { $inc: { votes: -1 } },
      { new: true }
    )

    res.status(200).json({ votes: bag.votes })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// -----------------------------
// GET ALL VOTES (admin/debug)
// -----------------------------
export const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate("user", "email")
      .populate("bag", "name")

    res.json(votes)
  } catch (err) {
    res.status(500).json({
      message: "Get votes failed",
      error: err.message
    })
  }
}

// -----------------------------
// GET VOTES FOR ONE BAG
// -----------------------------
export const getVotesForBag = async (req, res) => {
  try {
    const votes = await Vote.countDocuments({
      bag: req.params.bagId
    })

    res.json({ votes })
  } catch (err) {
    res.status(500).json({
      message: "Get votes for bag failed",
      error: err.message
    })
  }
}
