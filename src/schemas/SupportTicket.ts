import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    isStaff: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SupportTicketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customer: { type: String, required: true },
    email: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    status: { type: String, enum: ["open", "pending", "resolved", "closed"], default: "open" },
    replies: { type: [ReplySchema], default: [] },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

export default mongoose.models.SupportTicket || mongoose.model("SupportTicket", SupportTicketSchema);
