import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['cod', 'bkash', 'nagad'], 
    default: 'cod' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['unpaid', 'paid', 'partially_paid'], 
    default: 'unpaid' 
  },
  transactionId: { type: String },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
