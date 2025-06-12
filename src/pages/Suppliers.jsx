import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddSupplierModal from "../components/AddSupplierModal";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/suppliers`);
      setSuppliers(res.data);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await axios.delete(`${API}/suppliers/${id}`, {
      headers: {
        "x-role": user?.role || "user"  
      }
    });
    fetchData();
    } catch (err) {
      console.error("Failed to delete supplier:", err);
    }
  };

  const handleEdit = (entry) => {
    setSelected(entry);
    setShowModal(true);
  };

  const headers = ["Supplier Name", "Contact Info", "Location", "Actions"];

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filtered.map((s) => [
    s.name,
    s.contact,
    s.location,
    user?.role === "admin" ? (
      <>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(s)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
      </>
    ) : (
      "-"
    )
  ]);

  return (
    <DashboardLayout>
      <h2>Suppliers</h2>
      {user?.role === "admin" && (
        <button className="btn btn-primary my-3" onClick={() => setShowModal(true)}>
          + Add Supplier
        </button>
      )}
      <SearchBar
        placeholder="Search Suppliers..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table headers={headers} data={data} />
      <AddSupplierModal
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
