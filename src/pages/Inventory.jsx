import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddInventoryModal from "../components/AddInventoryModal";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/inventory`);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API}/inventory/${id}`, {
      headers: {
        "x-role": user?.role || "user"  
      }
    });
    fetchData();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const headers = ["Item Name", "Quantity", "Price", "Supplier", "Actions"];

  const filteredItems = items.filter((i) =>
    i.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filteredItems.map((i) => [
    i.item_name,
    i.quantity,
    `$${i.price}`,
    i.supplier,
    user?.role === "admin" ? (
      <>
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => handleEdit(i)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(i.id)}
        >
          Delete
        </button>
      </>
    ) : (
      ""
    ),
  ]);

  return (
    <DashboardLayout>
      <h2>Inventory Items</h2>
      {user?.role === "admin" && (
        <button
          className="btn btn-primary my-3"
          onClick={() => setShowModal(true)}
        >
          + Add New Item
        </button>
      )}
      <SearchBar
        placeholder="Search Inventory..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table headers={headers} data={data} />
      <AddInventoryModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedItem(null);
          fetchData();
        }}
        selected={selectedItem}
      />
    </DashboardLayout>
  );
}
