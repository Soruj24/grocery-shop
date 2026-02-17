import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
  description: { type: String },
  unit: { type: String, default: 'pcs' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  reviewItems: {
    type: [
      {
        name: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    default: []
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
