import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Table from "../components/Table";
import OrderSupplyModal from "../components/OrderSupplyModal";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function OrderSupply() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/ordersupply`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch order supplies:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API}/ordersupply/${id}`, {
      headers: {
        "x-role": user?.role || "user"  
      }
    });
    fetchData();
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const handleEdit = (entry) => {
    setSelected(entry);
    setShowModal(true);
  };

  const headers = ["Supplier", "Item", "Quantity", "Order Date", "Actions"];

  const data = orders.map((o) => [
    o.supplier,
    o.item,
    o.quantity,
    new Date(o.order_date).toLocaleString(),
    user?.role === "admin" ? (
      <>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(o)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(o.id)}>Delete</button>
      </>
    ) : (
      ""
    )
  ]);

  return (
    <DashboardLayout>
      <h2>Order Supply</h2>
      {user?.role === "admin" && (
        <button className="btn btn-success my-3" onClick={() => setShowModal(true)}>
          + New Order
        </button>
      )}
      <Table headers={headers} data={data} />
      <OrderSupplyModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelected(null);
          fetchData();
        }}
        selected={selected}
      />
    </DashboardLayout>
  );
}
