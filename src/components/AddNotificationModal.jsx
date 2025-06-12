import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddNotificationModal({ show, onClose, selected }) {
  const { user } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: ""
  });

  useEffect(() => {
    if (selected) setFormData(selected);
    else setFormData({ title: "", message: "", recipient: "" });
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
        await axios.put(`${API}/notifications/${selected.id}`, formData, config);
      } else {
        await axios.post(`${API}/notifications`, formData, config);
      }

      onClose();
    } catch (err) {
      console.error("Error saving notification:", err);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selected ? "Edit Notification" : "Create Notification"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Recipient</Form.Label>
            <Form.Control type="email" name="recipient" value={formData.recipient} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">{selected ? "Update" : "Send Notification"}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
