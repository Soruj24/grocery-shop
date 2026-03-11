import mongoose, { Model, Document } from "mongoose";

export interface ISection extends Document {
  key: string;
  label: string;
  component: string;
  order: number;
  isActive: boolean;
  props?: any;
}

const SectionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // Unique identifier
  label: { type: String, required: true }, // Display name for Admin UI
  component: { type: String, required: true }, // Component name to render
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  props: { type: mongoose.Schema.Types.Mixed, default: {} }, // For future dynamic content
}, { timestamps: true });

const Section: Model<ISection> = mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);

export default Section;
