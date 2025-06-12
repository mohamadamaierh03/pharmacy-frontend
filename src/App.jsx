import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Notifications from "./pages/Notifications";
import Patients from "./pages/Patients";
import Prescriptions from "./pages/Prescriptions";
import Reports from "./pages/Reports";
import Suppliers from "./pages/Suppliers";
import OrderSupply from "./pages/OrderSupply";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/inventory"
          element={<PrivateRoute role="admin"><Inventory /></PrivateRoute>}
        />
        <Route
          path="/notifications"
          element={<PrivateRoute><Notifications /></PrivateRoute>}
        />
        <Route
          path="/patients"
          element={<PrivateRoute><Patients /></PrivateRoute>}
        />
        <Route
          path="/prescriptions"
          element={<PrivateRoute><Prescriptions /></PrivateRoute>}
        />
        <Route
          path="/reports"
          element={<PrivateRoute><Reports /></PrivateRoute>}
        />
        <Route
          path="/suppliers"
          element={<PrivateRoute role="admin"><Suppliers /></PrivateRoute>}
        />
        <Route
          path="/ordersupply"
          element={<PrivateRoute role="admin"><OrderSupply /></PrivateRoute>}
        />
        <Route
          path="/admin-tools"
          element={<PrivateRoute role="admin"><AdminPanel /></PrivateRoute>}
        />

       
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
