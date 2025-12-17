import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bag: { type: mongoose.Schema.Types.ObjectId, ref: "Bag", required: true }
  },
  { timestamps: true }
);

// één user mag maar één keer op dezelfde bag stemmen
voteSchema.index({ user: 1, bag: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
