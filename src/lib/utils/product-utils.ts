import { Toast } from "@/lib/utils/toast";
import type { TranslationKey } from "@/lib/constants/translations";

const unitLabelMap: Record<string, string> = {
  kg: "unit_kg",
  g: "unit_g",
  mg: "unit_mg",
  l: "unit_l",
  ml: "unit_ml",
  pcs: "unit_piece",
  pack: "unit_pack",
  box: "unit_box",
  bottle: "unit_bottle",
  dozen: "unit_dozen",
};

export function getUnitLabel(unit: string | undefined, t: (key: TranslationKey) => string): string {
  const key = unitLabelMap[unit ?? ""] as TranslationKey | undefined;
  return key ? t(key) : (unit || t("default_unit" as TranslationKey) || "");
}

export function handleShare(productName: string, productId: string, t: (key: TranslationKey) => string) {
  if (navigator.share) {
    navigator.share({
      title: productName,
      text: t("share_text" as TranslationKey),
      url: `${window.location.origin}/products/${productId}`,
    });
  } else {
    navigator.clipboard.writeText(`${window.location.origin}/products/${productId}`);
    Toast.fire({ icon: "success", title: t("share_success" as TranslationKey) });
  }
}
