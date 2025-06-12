import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddPatientModal from "../components/AddPatientModal";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/patients`);
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await axios.delete(`${API}/patients/${id}`, {
      headers: {
        "x-role": user?.role || "user"  
      }
    });
    fetchData();
    } catch (err) {
      console.error("Failed to delete patient:", err);
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const headers = ["Full Name", "Date of Birth", "Contact Info", "Actions"];

  const filtered = patients.filter((p) =>
    p.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filtered.map((p) => [
    p.full_name,
    p.dob,
    p.contact,
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
      <h2>Patient Management Dashboard</h2>
      {user?.role === "admin" && (
        <button className="btn btn-primary my-3" onClick={() => setShowModal(true)}>
          + Add New Patient
        </button>
      )}
      <SearchBar
        placeholder="Search patients..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table headers={headers} data={data} />
      <AddPatientModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPatient(null);
          fetchData();
        }}
        selected={selectedPatient}
      />
    </DashboardLayout>
  );
}
