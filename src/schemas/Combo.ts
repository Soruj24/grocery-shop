import mongoose from 'mongoose';

const ComboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: String, required: true }],
  price: { type: Number, required: true },
  saveAmount: { type: Number, required: true },
  tag: { type: String, default: 'new' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Combo || mongoose.model('Combo', ComboSchema);
