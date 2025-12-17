import mongoose from "mongoose";

const bagSchema = new mongoose.Schema(
  {
    name: String,
    image: { type: String, default: null },
    backgroundPreset: { type: String, default: null },
  backgroundImage: { type: String, default: null },
    bagColor: String,
    font: String,
    pattern: String,
    packaging: String,
    inspiration: String,
    keyFlavours: [String],
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Bag", bagSchema);
