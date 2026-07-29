import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "push", "banner"], default: "email" },
    status: { type: String, enum: ["draft", "active", "completed", "scheduled"], default: "draft" },
    scheduledAt: { type: Date },
    segments: { type: [String], default: [] },
    stats: {
      sent: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
    },
    content: { type: mongoose.Schema.Types.Mixed },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Campaign || mongoose.model("Campaign", CampaignSchema);
