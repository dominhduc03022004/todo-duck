import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    streak: {
      type: Number,
      default: 0,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avaterUrl: {
      type: String,
    },
    avaterId: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phone: {
      type: String,
      sparse: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
