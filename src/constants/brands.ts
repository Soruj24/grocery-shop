export const PRODUCT_BRANDS = [
  "FreshFarm",
  "OrganicCo",
  "DailyHarvest",
  "Nature's Best",
  "GreenLeaf",
  "PureRoot",
  "FarmToHome",
  "GoldenGrain",
  "SweetOrchard",
  "AquaFresh",
] as const;

export type ProductBrand = (typeof PRODUCT_BRANDS)[number];
