 # Frontend (React + Vite)

 Description
  The frontend is built using React 18 and Vite, and supports two roles:

 Users: View data, search inventory
 Admins: Full CRUD access to all modules

# Includes:

Login / Register

Role-based UI rendering

Session persistence via localStorage

Responsive UI with Bootstrap

 ## User Requirements

| Action                 | User  | Admin   |
| ---------------------- | ---- | ----- |
| Login/Register         | Yes   | Yes      |
| View Inventory         | Yes    | Yes      |
| Add/Edit/Delete Items  | No    | Yes      |
| Add Patients/Suppliers | No    | Yes      |
| Generate Reports       | No    | Yes      |



# Technologies
React 18 + Vite
Axios
React Router
Bootstrap 5
LocalStorage (for session persistence)

 # Getting Started
```
# 1. Navigate to frontend directory
cd pharmacy-frontend

# 2. Install frontend dependencies
npm install

# 3. Start the dev server
npm run dev
```

# App will run at:
http://localhost:5173

 # Frontend Pages
```
pharmacy-frontend/
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Inventory.jsx
│   ├── Patients.jsx
│   ├── Prescriptions.jsx
│   ├── Suppliers.jsx
│   ├── Reports.jsx
│   ├── Notifications.jsx
│   └── OrderSupply.jsx
├── components/
│   ├── Modals (Add/Edit)
│   ├── StatCard, SearchBar
├── context/
│   └── AuthContext.jsx
├── App.jsx
└── main.jsx
```