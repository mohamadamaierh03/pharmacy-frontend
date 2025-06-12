import { useState, useEffect, useContext } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Reports() {
  const [inventoryReport, setInventoryReport] = useState([]);
  const [prescriptionReport, setPrescriptionReport] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const config = {
        headers: {
          "x-role": user?.role || "user"
        }
      };

      const [inv, pres] = await Promise.all([
        axios.get(`${API}/reports/inventory-summary`, config),
        axios.get(`${API}/reports/prescription-status`, config)
      ]);

      setInventoryReport(inv.data);
      setPrescriptionReport(pres.data);
    } catch (err) {
      console.error("Failed to fetch report data:", err);
    }
  };

  if (user?.role !== "admin") {
    return (
      <DashboardLayout>
        <h2>Reports</h2>
        <p className="text-danger">Access denied. Admins only.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2>Reports</h2>

      <div className="my-4">
        <h5>Inventory Summary</h5>
        {inventoryReport.length === 0 ? (
          <p>No inventory data available.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventoryReport.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.item_name}</td>
                  <td>{item.total_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="my-4">
        <h5>Prescription Status Report</h5>
        {prescriptionReport.length === 0 ? (
          <p>No prescription data available.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionReport.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.status}</td>
                  <td>{entry.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
