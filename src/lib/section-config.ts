export const sectionConfigs: Record<string, any> = {
  hero: {
    label: "Hero Slider",
    fields: [
      {
        name: "slides",
        label: "Slides",
        type: "array",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "desc", label: "Description", type: "textarea" },
          { name: "image", label: "Image URL", type: "image" },
          { name: "badge", label: "Badge Text", type: "text" },
          { 
            name: "color", 
            label: "Color Theme", 
            type: "select", 
            options: [
              { label: "Green/Emerald", value: "from-green-400 via-emerald-400 to-teal-300" },
              { label: "Orange/Amber", value: "from-orange-400 via-amber-400 to-yellow-300" },
              { label: "Blue/Indigo", value: "from-blue-400 via-indigo-400 to-purple-300" },
              { label: "Rose/Pink", value: "from-rose-400 via-pink-400 to-red-300" }
            ] 
          },
        ]
      }
    ]
  },
  "daily-deals": {
    label: "Daily Deals Banner",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "image", label: "Product Image", type: "image" },
      { name: "productName", label: "Product Name", type: "text" },
      { name: "price", label: "Current Price", type: "text" },
      { name: "originalPrice", label: "Original Price", type: "text" },
      { name: "discount", label: "Discount Label", type: "text" },
      { name: "badge", label: "Top Badge Text", type: "text" },
    ]
  },
  "ramadan-offers": {
    label: "Ramadan Offers",
    fields: [
       {
        name: "offers",
        label: "Offers",
        type: "array",
        itemFields: [
          { name: "title", label: "Title", type: "text" },
          { name: "discount", label: "Discount Text", type: "text" },
          { name: "icon", label: "Icon/Image URL", type: "image" },
          { 
            name: "color", 
            label: "Background Color", 
            type: "select",
            options: [
              { label: "Emerald", value: "bg-emerald-500" },
              { label: "Orange", value: "bg-orange-500" },
              { label: "Rose", value: "bg-rose-500" },
              { label: "Blue", value: "bg-blue-500" },
            ]
          }
        ]
       }
    ]
  }
};
