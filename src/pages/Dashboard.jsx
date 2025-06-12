import { useEffect, useState, useContext } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "../components/StatCard";
import axios from "axios";
import MedicineSearch from "../components/MedicineSearch";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    prescriptions: 0,
    suppliers: 0,
    lowStock: 0,
    patients: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pres, supp, inv, pat] = await Promise.all([
          axios.get(`${API}/prescriptions`),
          axios.get(`${API}/suppliers`),
          axios.get(`${API}/inventory`),
          axios.get(`${API}/patients`),
        ]);

        setStats({
          prescriptions: pres.data.length,
          suppliers: supp.data.length,
          lowStock: inv.data.filter((i) => i.quantity < 5).length,
          patients: pat.data.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h2>Pharmacy Management System</h2>

      <div className="my-4">
        <h5>Quick Stats:</h5>
        <div className="d-flex gap-3 flex-wrap">
          <StatCard title="Total Prescriptions" count={stats.prescriptions} />
          <StatCard title="Active Suppliers" count={stats.suppliers} />
          <StatCard title="Low Stock Alerts" count={stats.lowStock} />
          <StatCard title="Registered Patients" count={stats.patients} />
        </div>
        <div className="mt-4">
          <MedicineSearch />
        </div>
      </div>

      <div>
        <h5>Navigation Shortcuts:</h5>
        <div className="d-flex gap-3 flex-wrap">
          {user?.role === "admin" && (
            <Link to="/patients" className="btn btn-primary">
              Add New Patient +
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/ordersupply" className="btn btn-primary">
              Order Supplies +
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/reports" className="btn btn-primary">
              Generate Reports +
            </Link>
          )}
          <Link to="/inventory" className="btn btn-primary">
            Update Stock +
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
