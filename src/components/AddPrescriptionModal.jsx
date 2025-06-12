import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddPrescriptionModal({ show, onClose, selected }) {
  const { user } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    date_issued: "",
    status: ""
  });

  useEffect(() => {
    if (selected) {
      setFormData(selected);
    } else {
      setFormData({
        patient_name: "",
        doctor_name: "",
        date_issued: "",
        status: ""
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "x-role": user?.role || "user" 
        }
      };

      if (selected) {
        await axios.put(`${API}/prescriptions/${selected.id}`, formData, config);
      } else {
        await axios.post(`${API}/prescriptions`, formData, config);
      }

      onClose();
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selected ? "Edit Prescription" : "Add Prescription"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Doctor Name</Form.Label>
            <Form.Control
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Issued</Form.Label>
            <Form.Control
              type="date"
              name="date_issued"
              value={formData.date_issued}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            {selected ? "Update" : "Add"} Prescription
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
