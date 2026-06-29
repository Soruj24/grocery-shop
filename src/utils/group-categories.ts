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
