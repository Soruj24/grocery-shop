import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    // ─── General ───
    general: {
      shopName: { type: String, default: "Grocery Shop" },
      logo: { type: String, default: "" },
      favicon: { type: String, default: "" },
      tagline: { type: String, default: "" },
      description: { type: String, default: "" },
      currency: { type: String, default: "BDT" },
      currencySymbol: { type: String, default: "৳" },
      timezone: { type: String, default: "Asia/Dhaka" },
      locale: { type: String, default: "bn-BD" },
    },

    // ─── Store ───
    store: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "Bangladesh" },
      website: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      footerDescription: { type: String, default: "" },
      copyrightText: { type: String, default: "" },
      shopStatus: { type: Boolean, default: true },
      maintenanceMessage: { type: String, default: "" },
    },

    // ─── Profile ───
    profile: {
      displayName: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      avatar: { type: String, default: "" },
      bio: { type: String, default: "" },
    },

    // ─── Security ───
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 60 },
      passwordMinLength: { type: Number, default: 8 },
      requirePasswordChange: { type: Boolean, default: false },
      loginNotifications: { type: Boolean, default: true },
      ipWhitelist: { type: [String], default: [] },
    },

    // ─── Notifications ───
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      orderAlerts: { type: Boolean, default: true },
      stockAlerts: { type: Boolean, default: true },
      dailyReport: { type: Boolean, default: false },
      weeklyReport: { type: Boolean, default: true },
      newCustomerAlert: { type: Boolean, default: true },
      reviewAlerts: { type: Boolean, default: true },
      lowStockThreshold: { type: Number, default: 10 },
    },

    // ─── Payments ───
    payments: {
      codEnabled: { type: Boolean, default: true },
      bkashEnabled: { type: Boolean, default: false },
      nagadEnabled: { type: Boolean, default: false },
      cardEnabled: { type: Boolean, default: false },
      bkashNumber: { type: String, default: "" },
      nagadNumber: { type: String, default: "" },
      merchantId: { type: String, default: "" },
      testMode: { type: Boolean, default: true },
    },

    // ─── Shipping ───
    shipping: {
      deliveryCharge: { type: Number, default: 50 },
      freeDeliveryThreshold: { type: Number, default: 0 },
      expressDeliveryEnabled: { type: Boolean, default: false },
      expressDeliveryCharge: { type: Number, default: 100 },
      sameDayDeliveryEnabled: { type: Boolean, default: false },
      sameDayDeliveryCharge: { type: Number, default: 150 },
      deliverySlots: {
        type: [
          {
            label: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            isActive: { type: Boolean, default: true },
          },
        ],
        default: [
          { label: "Morning", startTime: "08:00", endTime: "12:00", isActive: true },
          { label: "Afternoon", startTime: "12:00", endTime: "17:00", isActive: true },
          { label: "Evening", startTime: "17:00", endTime: "21:00", isActive: true },
        ],
      },
      freeDeliveryZones: { type: [String], default: [] },
    },

    // ─── Tax ───
    tax: {
      taxEnabled: { type: Boolean, default: false },
      taxRate: { type: Number, default: 0 },
      taxName: { type: String, default: "VAT" },
      taxRegistrationNumber: { type: String, default: "" },
      taxInclusive: { type: Boolean, default: false },
    },

    // ─── Email ───
    email: {
      smtpHost: { type: String, default: "" },
      smtpPort: { type: Number, default: 587 },
      smtpUser: { type: String, default: "" },
      smtpPass: { type: String, default: "" },
      fromName: { type: String, default: "" },
      fromEmail: { type: String, default: "" },
      replyTo: { type: String, default: "" },
      encryption: { type: String, default: "tls" },
    },

    // ─── Integrations ───
    integrations: {
      googleAnalyticsId: { type: String, default: "" },
      facebookPixelId: { type: String, default: "" },
      googleTagManagerId: { type: String, default: "" },
      smsGateway: { type: String, default: "" },
      smsApiKey: { type: String, default: "" },
      smsSender: { type: String, default: "" },
      analyticsEnabled: { type: Boolean, default: false },
    },

    // ─── Appearance ───
    appearance: {
      primaryColor: { type: String, default: "#18181b" },
      accentColor: { type: String, default: "#22c55e" },
      fontFamily: { type: String, default: "Geist" },
      borderRadius: { type: String, default: "lg" },
      darkMode: { type: Boolean, default: false },
      compactMode: { type: Boolean, default: false },
      bannerEnabled: { type: Boolean, default: false },
      bannerText: { type: String, default: "" },
      bannerBgColor: { type: String, default: "#18181b" },
      bannerTextColor: { type: String, default: "#ffffff" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);
