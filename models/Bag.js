import mongoose from "mongoose";

const bagSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    bagColor: String,
    font: String,
    pattern: String,
    packaging: String,
    inspiration: String,
    keyFlavours: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Bag", bagSchema);
