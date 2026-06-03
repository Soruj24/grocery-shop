export function getStatusLabel(status: string): string {
  switch (status) {
    case "pending": return "পেন্ডিং";
    case "confirmed": return "নিশ্চিত";
    case "processing": return "প্রসেসিং";
    case "shipped": return "শিফড";
    case "delivered": return "ডেলিভারড";
    case "cancelled": return "ক্যান্সেল";
    default: return status;
  }
}
