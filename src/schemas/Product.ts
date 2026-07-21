import mongoose from "mongoose";

const VariantOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    price: { type: Number },
    stock: { type: Number },
    image: { type: String },
  },
  { _id: false },
);

const VariantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    options: { type: [VariantOptionSchema], default: [] },
  },
  { _id: false },
);

const SpecificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    user: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, index: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String },
    images: { type: [String], default: [] },
    video: { type: String },
    view360: { type: [String], default: [] },
    description: { type: String },
    unit: { type: String, default: "pcs" },
    discount: { type: Number, default: 0 },
    discountPrice: { type: Number },
    isDeal: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    reviewItems: {
      type: [
        {
          name: { type: String, required: true },
          rating: { type: Number, min: 1, max: 5, required: true },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    variants: { type: [VariantSchema], default: [] },
    specifications: { type: [SpecificationSchema], default: [] },
    questions: { type: [QuestionSchema], default: [] },
    aiSummary: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
