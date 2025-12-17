import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: { type: String, default: "user" } // user of admin
    },
    { timestamps: true }
  );
  
  export default mongoose.model("User", userSchema);
  