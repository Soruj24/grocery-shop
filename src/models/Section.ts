import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // Unique identifier
  label: { type: String, required: true }, // Display name for Admin UI
  component: { type: String, required: true }, // Component name to render
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  props: { type: mongoose.Schema.Types.Mixed, default: {} }, // For future dynamic content
}, { timestamps: true });

export default mongoose.models.Section || mongoose.model("Section", SectionSchema);
