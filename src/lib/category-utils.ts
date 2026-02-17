import { AdminCategory, GroupedCategory } from "@/types/admin";

export function groupCategories(categories: AdminCategory[]): Record<string, GroupedCategory> {
  return categories.reduce(
    (acc: Record<string, GroupedCategory>, cat) => {
      if (!cat.parentId) {
        if (!acc[cat._id]) acc[cat._id] = { ...cat, subCategories: [] };
        else {
          acc[cat._id].name = cat.name;
          acc[cat._id]._id = cat._id;
        }
      } else {
        const parentId =
          typeof cat.parentId === "object" ? cat.parentId._id : cat.parentId;
        if (!acc[parentId])
          acc[parentId] = { _id: parentId, name: "", subCategories: [cat] };
        else acc[parentId].subCategories!.push(cat);
      }
      return acc;
    },
    {},
  );
}

// Map keywords to high-quality Unsplash images
const fallbackImageMap: Record<string, string> = {
  // Staples & Grains
  "sugar": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  "salt": "https://images.unsplash.com/photo-1610419623805-48181342683a?auto=format&fit=crop&q=80&w=800",
  "rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
  "flour": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  "atta": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  "lentil": "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=800",
  "dal": "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=800",
  "oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
  "spice": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
  "masala": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800",

  // Beverages
  "tea": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800",
  "coffee": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  "beverage": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
  "drink": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800",
  "water": "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=800",
  "juice": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800",
  "soda": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",

  // Snacks & Bakery
  "biscuit": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  "cookie": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  "snack": "https://images.unsplash.com/photo-1621939514649-28b12e81658b?auto=format&fit=crop&q=80&w=800",
  "chips": "https://images.unsplash.com/photo-1566478919030-41567d132d13?auto=format&fit=crop&q=80&w=800",
  "chocolate": "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800",
  "noodle": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800",
  "pasta": "https://images.unsplash.com/photo-1551446591-142875a901a1?auto=format&fit=crop&q=80&w=800",
  "bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  "bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",

  // Fresh Produce
  "fruit": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800",
  "orange": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800",
  "apple": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=800",
  "banana": "https://images.unsplash.com/photo-1603833665858-e61d17a8622e?auto=format&fit=crop&q=80&w=800",
  "vegetable": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800",
  "onion": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800",
  "potato": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800",
  "tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
  
  // Proteins
  "meat": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800",
  "chicken": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800",
  "beef": "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=800",
  "mutton": "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=800",
  "fish": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800",
  "egg": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=800",

  // Dairy
  "dairy": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800",
  "milk": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
  "yogurt": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
  "curd": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
  "cheese": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800",
  "butter": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800",
  "ghee": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800",

  // Personal Care & Home
  "soap": "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=800",
  "shampoo": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800",
  "detergent": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800",
  "clean": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800",
  "baby": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800",
  "beauty": "https://images.unsplash.com/photo-1596462502278-27bfdd403ccc?auto=format&fit=crop&q=80&w=800",
  "pet": "https://images.unsplash.com/photo-1541781777631-faaf29752167?auto=format&fit=crop&q=80&w=800",
  "home": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
  "frozen": "https://images.unsplash.com/photo-1563122904-8b6f3c4c6b8c?auto=format&fit=crop&q=80&w=800",

  // UI/Pages
  "delivery": "https://images.unsplash.com/photo-1601600576337-1c08d5b7bc85?auto=format&fit=crop&q=80&w=800",
  "support": "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800",
  "login": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
  "signup": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800",
  "track": "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=800",
  "newsletter": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800",
  "about": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",

  // Bangla keywords
  "চিনি": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  "লবণ": "https://images.unsplash.com/photo-1610419623805-48181342683a?auto=format&fit=crop&q=80&w=800",
  "চাল": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
  "আটা": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  "ময়দা": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  "সুজি": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  "ডাল": "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=800",
  "তেল": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
  "মশলা": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
  
  "চা": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800",
  "কফি": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  "বিস্কুট": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  "নুডলস": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800",
  "পাস্তা": "https://images.unsplash.com/photo-1551446591-142875a901a1?auto=format&fit=crop&q=80&w=800",
  "পানীয়": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
  "জুস": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800",
  
  "ফল": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800",
  "সবজি": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800",
  "আলু": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800",
  "পেঁয়াজ": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800",
  
  "মাংস": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800",
  "মুরগি": "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800",
  "গরু": "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=800",
  "মাছ": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800",
  "ডিম": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=800",
  
  "দুধ": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
  "দই": "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
  "পনির": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800",
  "মাখন": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800",
  "ঘি": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800",
  
  "সাবান": "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=800",
  "শ্যাম্পু": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800",
  "ডিটারজেন্ট": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800",
  "চকলেট": "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800",
};

export function getCategoryFallbackImage(name: string): string {
  const lowerName = name.toLowerCase();
  
  // Try to find a matching keyword in the category name
  for (const [keyword, url] of Object.entries(fallbackImageMap)) {
    if (lowerName.includes(keyword)) {
      return url;
    }
  }

  // Generic fallback if no keyword matches
  return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800";
}

export function getProductFallbackImage(name: string): string {
  // Use the same logic as categories for now, but we might add product-specific fallback later
  // For products, if no specific match, we might want a different generic image or just the same one
  return getCategoryFallbackImage(name);
}
