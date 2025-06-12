import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

const API = import.meta.env.VITE_API_BASE_URL;

export default function OrderSupplyModal({ show, onClose, selected }) {
  const { user } = useContext(AuthContext); 

  const [formData, setFormData] = useState({
    supplier: "",
    item: "",
    quantity: ""
  });

  useEffect(() => {
    if (selected) setFormData(selected);
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
        await axios.put(`${API}/ordersupply/${selected.id}`, formData, config);
      } else {
        await axios.post(`${API}/ordersupply`, formData, config);
      }

      onClose();
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Order failed: Check role or server response.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selected ? "Edit Order" : "Order Supply"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Supplier</Form.Label>
            <Form.Control type="text" name="supplier" value={formData.supplier} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item</Form.Label>
            <Form.Control type="text" name="item" value={formData.item} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          </Form.Group>
          <Button variant="success" type="submit">{selected ? "Update Order" : "Submit Order"}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
