"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Pagination from "@/components/admin/Pagination";
import AdminTable from "@/components/admin/AdminTable";
import OrderTableRow from "@/components/admin/orders/OrderTableRow";
import { AdminOrder } from "@/types/admin";
import Modal from "@/components/ui/Modal";
import { toast } from "@/lib/swal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [deliveryData, setDeliveryData] = useState({
    deliveryStatus: "",
    trackingId: "",
    deliveryBoyName: "",
    deliveryBoyPhone: "",
  });
  const itemsPerPage = 10;

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success("অর্ডারের স্ট্যাটাস আপডেট করা হয়েছে");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditClick = (order: AdminOrder) => {
    setSelectedOrder(order);
    setDeliveryData({
      deliveryStatus: order.deliveryStatus || "pending",
      trackingId: order.trackingId || "",
      deliveryBoyName: order.deliveryBoy?.name || "",
      deliveryBoyPhone: order.deliveryBoy?.phone || "",
    });
    setIsModalOpen(true);
  };

  const handleDeliveryUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder._id,
          deliveryStatus: deliveryData.deliveryStatus,
          trackingId: deliveryData.trackingId,
          deliveryBoy: {
            name: deliveryData.deliveryBoyName,
            phone: deliveryData.deliveryBoyPhone,
          },
        }),
      });

      if (res.ok) {
        toast.success("ডেলিভারি তথ্য আপডেট করা হয়েছে");
        setIsModalOpen(false);
        fetchOrders();
      }
    } catch (error) {
      toast.error("আপডেট করতে সমস্যা হয়েছে");
    }
  };

  const filteredOrders = orders.filter(
    (order: AdminOrder) =>
      order.phone.includes(search) || order._id.includes(search),
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader
        title="অর্ডার ম্যানেজমেন্ট"
        count={orders.length}
        countLabel="Orders"
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="অর্ডার আইডি বা ফোন নম্বর দিয়ে সার্চ করুন..."
      />

      <AdminTable
        columns={[
          { header: "অর্ডার আইডি" },
          { header: "কাস্টমার" },
          { header: "মোট টাকা" },
          { header: "পেমেন্ট" },
          { header: "স্ট্যাটাস" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        loading={loading}
        emptyMessage="কোন অর্ডার পাওয়া যায়নি"
      >
        {paginatedOrders.map((order) => (
          <OrderTableRow
            key={order._id}
            order={order}
            onStatusUpdate={updateStatus}
            onEditClick={handleEditClick}
          />
        ))}
      </AdminTable>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
        label="Orders"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ডেলিভারি ট্র্যাকিং আপডেট"
      >
        <form onSubmit={handleDeliveryUpdate} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডেলিভারি স্ট্যাটাস</label>
              <select
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                value={deliveryData.deliveryStatus}
                onChange={(e) => setDeliveryData({ ...deliveryData, deliveryStatus: e.target.value })}
              >
                <option value="pending">পেন্ডিং</option>
                <option value="processing">প্রসেসিং</option>
                <option value="shipped">শিপড</option>
                <option value="delivered">ডেলিভারড</option>
                <option value="returned">রিটার্নড</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">ট্র্যাকিং আইডি</label>
              <input
                type="text"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                placeholder="TRK-XXXXXX"
                value={deliveryData.trackingId}
                onChange={(e) => setDeliveryData({ ...deliveryData, trackingId: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">ডেলিভারি বয় (নাম)</label>
                <input
                  type="text"
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                  value={deliveryData.deliveryBoyName}
                  onChange={(e) => setDeliveryData({ ...deliveryData, deliveryBoyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">ফোন নম্বর</label>
                <input
                  type="text"
                  className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                  value={deliveryData.deliveryBoyPhone}
                  onChange={(e) => setDeliveryData({ ...deliveryData, deliveryBoyPhone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
          >
            আপডেট করুন
          </button>
        </form>
      </Modal>
    </div>
  );
}
