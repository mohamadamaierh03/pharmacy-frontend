import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 w-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column w-100">
        <Navbar />
        <div className="flex-grow-1 p-3 p-md-4 bg-light">
          {children}
        </div>
      </div>
    </div>
  );
}