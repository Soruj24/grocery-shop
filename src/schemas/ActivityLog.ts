import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["order", "user", "settings", "product", "security", "system", "alert", "login"],
      required: true,
    },
    action: { type: String, required: true },
    user: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    targetId: { type: String },
    targetModel: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
    ip: { type: String },
  },
  { timestamps: true }
);

ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ type: 1, createdAt: -1 });

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);
