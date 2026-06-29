"use client";

import Modal from "@/components/ui/Modal";

interface DeliveryForm {
  deliveryStatus: string;
  trackingId: string;
  deliveryBoyName: string;
  deliveryBoyPhone: string;
}

interface DeliveryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryData: DeliveryForm;
  onDataChange: (data: DeliveryForm) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const inputClass = "w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold";

export default function DeliveryFormModal({ isOpen, onClose, deliveryData, onDataChange, onSubmit }: DeliveryFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ডেলিভারি ট্র্যাকিং আপডেট">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডেলিভারি স্ট্যাটাস</label>
            <select className={inputClass} value={deliveryData.deliveryStatus}
              onChange={(e) => onDataChange({ ...deliveryData, deliveryStatus: e.target.value })}>
              <option value="pending">পেন্ডিং</option>
              <option value="processing">প্রসেসিং</option>
              <option value="shipped">শিপড</option>
              <option value="delivered">ডেলিভারড</option>
              <option value="returned">রিটার্নড</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">ট্র্যাকিং আইডি</label>
            <input type="text" className={inputClass} placeholder="TRK-XXXXXX" value={deliveryData.trackingId}
              onChange={(e) => onDataChange({ ...deliveryData, trackingId: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডেলিভারি বয় (নাম)</label>
              <input type="text" className={inputClass} value={deliveryData.deliveryBoyName}
                onChange={(e) => onDataChange({ ...deliveryData, deliveryBoyName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ফোন নম্বর</label>
              <input type="text" className={inputClass} value={deliveryData.deliveryBoyPhone}
                onChange={(e) => onDataChange({ ...deliveryData, deliveryBoyPhone: e.target.value })} />
            </div>
          </div>
        </div>
        <button type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]">
          আপডেট করুন
        </button>
      </form>
    </Modal>
  );
}
