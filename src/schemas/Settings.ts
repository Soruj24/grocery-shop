import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  // General
  shopName: { type: String, default: 'Grocery Shop' },
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  
  // Contact
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  
  // Social
  facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  whatsapp: { type: String, default: '' }, // WhatsApp Number
  
  // Footer
  footerDescription: { type: String, default: '' },
  copyrightText: { type: String, default: '' },
  
  // Business Logic
  deliveryCharge: { type: Number, default: 50 },
  freeDeliveryThreshold: { type: Number, default: 0 }, // 0 means disabled
  taxRate: { type: Number, default: 0 }, // Percentage
  shopStatus: { type: Boolean, default: true },
  currencySymbol: { type: String, default: '৳' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
