import { useState } from "react";
import axios from "axios";

export default function MedicineSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMedicine = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.fda.gov/drug/label.json?search=${query}&limit=1`
      );
      setResult(res.data.results[0]);
    } catch (err) {
      console.error("Error fetching medicine info:", err);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h5>Search Medicine Info</h5>
      <div className="d-flex gap-2 my-2">
        <input
          className="form-control"
          placeholder="Enter medicine name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchMedicine} disabled={!query}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {result && (
        <div className="mt-3">
          <h6><strong>Name:</strong> {result.openfda?.generic_name?.[0] || "N/A"}</h6>
          <p><strong>Purpose:</strong> {result.purpose?.[0] || "N/A"}</p>
          <p><strong>Indications:</strong> {result.indications_and_usage?.[0] || "N/A"}</p>
        </div>
      )}
    </div>
  );
}
