import mongoose from "mongoose";

const bagSchema = new mongoose.Schema(
  {
    name: String,
    image: { type: String, default: null },
    backgroundPreset: { type: String, default: null },
    backgroundImage: { type: String, default: null },
    bagColor: String,
    font: { type: String, default: "Helvetica" }, 
    votes: { type: Number, default: 0 }, 
    keyFlavours: [String],
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" ,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Bag", bagSchema);
