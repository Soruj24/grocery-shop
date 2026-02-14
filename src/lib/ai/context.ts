import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Settings from "@/models/Settings";

export const getAIContext = async (role: "admin" | "customer") => {
  await dbConnect();
  
  const products = await Product.find({ isActive: true }).populate("category").lean();
  const settings = await Settings.findOne({}).lean();
  
  let context = `
Shop Name: ${settings?.shopName || "মোহাম্মদ ইমরান হোসাইন"}
Address: ${settings?.shopStatus ? settings.address : "দোকান বর্তমানে বন্ধ আছে"}
Delivery Charge: ৳${settings?.deliveryCharge || 20}

Products Available:
${products.map(p => `- ${p.name}: ৳${p.price} (Category: ${(p.category as { name: string })?.name}, Stock: ${p.stock})`).join("\n")}
`;

  if (role === "admin") {
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(10).lean();
    context += `
Recent Orders (Admin Only):
${orders.map(o => `- Order #${o._id}: ৳${o.total} (${o.status})`).join("\n")}
`;
  }

  return context;
};
