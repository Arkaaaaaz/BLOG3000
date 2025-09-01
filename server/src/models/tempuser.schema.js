import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

const TempUser = mongoose.model("tempUser", tempUserSchema);

export default TempUser;
