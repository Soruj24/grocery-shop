import mongoose from "mongoose";

const StockLogSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    type: { type: String, enum: ["adjustment", "restock", "sale", "return", "correction"], required: true },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true },
    newStock: { type: Number, required: true },
    reason: { type: String, default: "" },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

StockLogSchema.index({ createdAt: -1 });

export default mongoose.models.StockLog ||
  mongoose.model("StockLog", StockLogSchema);
