import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false, default: "" },
  address: { type: String, required: false, default: "" },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  loyaltyPoints: { type: Number, default: 0 },
  subscription: {
    plan: { type: String, enum: ['none', 'weekly', 'monthly'], default: 'none' },
    nextDelivery: { type: Date },
    isActive: { type: Boolean, default: false }
  }
}, { timestamps: true });

if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model('User', UserSchema);
export default User;
