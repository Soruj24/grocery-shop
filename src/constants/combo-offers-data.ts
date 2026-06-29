export interface ComboOffer {
  id: string;
  name: string;
  items: string[];
  price: number;
  oldPrice: number;
  image: string;
  tag: string;
  stock: number;
}

import { getProductFallbackImage } from "@/constants/fallback-images";
import type { TranslationKey } from "@/constants/translations";

export function getComboOffers(t: (key: TranslationKey) => string): ComboOffer[] {
  return [
    {
      id: "65cd123456789012345678b1",
      name: t("combo_family_pack"),
      items: [
        t("combo_item_rice_5kg"),
        t("combo_item_oil_2l"),
        t("combo_item_dal_1kg"),
        t("combo_item_sugar_1kg"),
      ],
      price: 1250,
      oldPrice: 1450,
      image: getProductFallbackImage("rice"),
      tag: t("combo_tag_best_value"),
      stock: 50,
    },
    {
      id: "65cd123456789012345678b2",
      name: t("combo_breakfast"),
      items: [
        t("combo_item_bread_1p"),
        t("combo_item_eggs_1d"),
        t("combo_item_jelly_500g"),
        t("combo_item_banana_1kg"),
      ],
      price: 450,
      oldPrice: 520,
      image: getProductFallbackImage("bread"),
      tag: t("combo_tag_popular"),
      stock: 100,
    },
    {
      id: "65cd123456789012345678b3",
      name: t("combo_kitchen_kit"),
      items: [
        t("combo_item_onion_1kg"),
        t("combo_item_garlic_500g"),
        t("combo_item_ginger_250g"),
        t("combo_item_potato_1kg"),
      ],
      price: 320,
      oldPrice: 380,
      image: getProductFallbackImage("vegetable"),
      tag: t("combo_tag_super_saver"),
      stock: 150,
    },
  ];
}
