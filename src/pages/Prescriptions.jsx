import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddPrescriptionModal from "../components/AddPrescriptionModal";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Prescriptions() {
  const [dataList, setDataList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/prescriptions`);
      setDataList(res.data);
    } catch (err) {
      console.error("Failed to fetch prescriptions:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prescription?")) return;
    try {
      await axios.delete(`${API}/prescriptions/${id}`, {
      headers: {
        "x-role": user?.role || "user"  
      }
    });
    fetchData();
    } catch (err) {
      console.error("Failed to delete prescription:", err);
    }
  };

  const handleEdit = (entry) => {
    setSelected(entry);
    setShowModal(true);
  };

  const headers = ["Patient Name", "Doctor", "Date Issued", "Status", "Actions"];

  const filtered = dataList.filter((p) =>
    p.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filtered.map((p) => [
    p.patient_name,
    p.doctor_name,
    p.date_issued,
    p.status,
    user?.role === "admin" ? (
      <>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
      </>
    ) : (
      ""
    )
  ]);

  return (
    <DashboardLayout>
      <h2>Prescription Management</h2>
      {user?.role === "admin" && (
        <button className="btn btn-primary my-3" onClick={() => setShowModal(true)}>
          + Create New Prescription
        </button>
      )}
      <SearchBar
        placeholder="Search Prescriptions..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table headers={headers} data={data} />
      <AddPrescriptionModal
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
