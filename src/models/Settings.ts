import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  shopName: { type: String, default: 'মোহাম্মদ ইমরান হোসাইন' },
  address: { type: String, default: 'জানের মোড়, Goyhata, Nagurpur, টাঙ্গাইল' },
  phone: { type: String, default: '01XXXXXXXXX' },
  deliveryCharge: { type: Number, default: 20 },
  shopStatus: { type: Boolean, default: true }, // true for open, false for closed
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
