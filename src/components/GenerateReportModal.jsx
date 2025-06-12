import { Modal, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_BASE_URL;

export default function GenerateReportModal({ show, onClose }) {
  const { user } = useContext(AuthContext); 
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API}/reports/generate`,
        { type },
        {
          headers: {
            "x-role": user?.role || "user" 
          }
        }
      );
      console.log("Report generated:", res.data);
      alert("Report generated successfully!");
      onClose();
    } catch (err) {
      console.error("Error generating report:", err);
      alert("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Generate Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Select Report Type</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="inventory">Inventory Report</option>
              <option value="prescriptions">Prescription Report</option>
              <option value="audit">Compliance Audit</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
