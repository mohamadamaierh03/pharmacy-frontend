import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import AddNotificationModal from "../components/AddNotificationModal";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/notifications`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await axios.delete(`${API}/notifications/${id}`, {
      headers: {
        "x-role": user?.role || "user"  
      }
    });
    fetchData();
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const handleEdit = (entry) => {
    setSelected(entry);
    setShowModal(true);
  };

  const headers = ["Title", "Message", "Recipient", "Date Sent", "Actions"];

  const filtered = notifications.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = filtered.map((n) => [
    n.title,
    n.message,
    n.recipient,
    new Date(n.date_sent).toLocaleString(),
    user?.role === "admin" ? (
      <>
        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(n)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(n.id)}>Delete</button>
      </>
    ) : (
      ""
    ),
  ]);

  return (
    <DashboardLayout>
      <h2>Notifications</h2>
      {user?.role === "admin" && (
        <button
          className="btn btn-primary my-3"
          onClick={() => setShowModal(true)}
        >
          + Create New Notification
        </button>
      )}
      <SearchBar
        placeholder="Search Notifications..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table headers={headers} data={data} />
      <AddNotificationModal
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
