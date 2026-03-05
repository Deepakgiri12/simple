import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  mobile: { type: String, unique: true },
  password: String,
});

export default mongoose.model("User", userSchema);