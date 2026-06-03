"use client";

import { useState, useEffect } from "react";
import { AdminOrder } from "@/types/admin";
import { toast } from "@/lib/swal";

interface DeliveryForm {
  deliveryStatus: string;
  trackingId: string;
  deliveryBoyName: string;
  deliveryBoyPhone: string;
}

export function useAdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [deliveryData, setDeliveryData] = useState<DeliveryForm>({
    deliveryStatus: "", trackingId: "", deliveryBoyName: "", deliveryBoyPhone: "",
  });

  const itemsPerPage = 10;

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      setOrders(await res.json());
    } catch { /* noop */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) { toast.success("অর্ডারের স্ট্যাটাস আপডেট করা হয়েছে"); fetchOrders(); }
    } catch { /* noop */ }
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
          deliveryBoy: { name: deliveryData.deliveryBoyName, phone: deliveryData.deliveryBoyPhone },
        }),
      });
      if (res.ok) { toast.success("ডেলিভারি তথ্য আপডেট করা হয়েছে"); setIsModalOpen(false); fetchOrders(); }
    } catch { toast.error("আপডেট করতে সমস্যা হয়েছে"); }
  };

  const filteredOrders = orders.filter((o) => o.phone.includes(search) || o._id.includes(search));
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    orders, loading, search, currentPage, isModalOpen, selectedOrder, deliveryData, itemsPerPage,
    filteredOrders, totalPages, paginatedOrders,
    setSearch, setCurrentPage, setIsModalOpen, setDeliveryData,
    updateStatus, handleEditClick, handleDeliveryUpdate,
  };
}
