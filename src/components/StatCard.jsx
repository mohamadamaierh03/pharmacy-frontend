export default function StatCard({ title, count }) {
  return (
    <div className="bg-primary text-white rounded shadow p-3 text-center" style={{ width: "180px" }}>
      <h6>{title}</h6>
      <h4>{count}</h4>
    </div>
  );
}