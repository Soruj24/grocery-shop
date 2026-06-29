"use client";

import AdminHeader from "@/features/admin/components/AdminHeader";
import Pagination from "@/features/admin/components/Pagination";
import AdminTable from "@/features/admin/components/AdminTable";
import OrderTableRow from "@/features/admin/orders/components/OrderTableRow";
import DeliveryFormModal from "@/features/admin/orders/components/DeliveryFormModal";
import { useAdminOrders } from "@/features/admin/orders/hooks/useAdminOrders";

export default function AdminOrdersPage() {
  const {
    loading, search, currentPage, isModalOpen, deliveryData, selectedOrder,
    filteredOrders, totalPages, paginatedOrders,
    setSearch, setCurrentPage, setIsModalOpen, setDeliveryData,
    updateStatus, handleEditClick, handleDeliveryUpdate,
  } = useAdminOrders();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader title="অর্ডার ম্যানেজমেন্ট" count={filteredOrders.length} countLabel="Orders"
        searchTerm={search} onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
        searchPlaceholder="অর্ডার আইডি বা ফোন নম্বর দিয়ে সার্চ করুন..." />

      <AdminTable columns={[
        { header: "অর্ডার আইড이" }, { header: "কাস্টমার" }, { header: "মোট টাকা" },
        { header: "পেমেন্ট" }, { header: "স্ট্যাটাস" }, { header: "অ্যাকশন", className: "text-right" },
      ]} loading={loading} emptyMessage="কোন অর্ডার পাওয়া যায়নি">
        {paginatedOrders.map((order) => (
          <OrderTableRow key={order._id} order={order} onStatusUpdate={updateStatus} onEditClick={handleEditClick} />
        ))}
      </AdminTable>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}
        totalItems={filteredOrders.length} itemsPerPage={10} label="Orders" />

      <DeliveryFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        deliveryData={deliveryData} onDataChange={setDeliveryData} onSubmit={handleDeliveryUpdate} />
    </div>
  );
}
