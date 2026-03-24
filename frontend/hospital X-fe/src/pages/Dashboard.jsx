import { useState, useEffect } from "react";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", bedId: "" });
  const [search, setSearch] = useState("");

  const fetchPatients = async () => {
    const res = await API.get("/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/patients", form);
    setForm({ name: "", bedId: "" });
    fetchPatients();
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.bedId.includes(search)
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1>Hospital X</h1>
        <button className="logout-btn">Logout</button>
      </div>

      {/* Search */}
      <input
        className="search"
        placeholder="Search by name or bed ID..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Patient */}
      <div className="form-section">
        <h2>Add Patient</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Patient Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="Bed ID"
            value={form.bedId}
            onChange={(e) =>
              setForm({ ...form, bedId: e.target.value })
            }
          />
          <button>Add</button>
        </form>
      </div>

      {/* Patient List */}
      <div className="patient-list">
        <h2>Patients</h2>

        {filteredPatients.length === 0 ? (
          <p>No patients found</p>
        ) : (
          filteredPatients.map((p) => (
            <div className="patient-card" key={p._id}>
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Bed ID:</strong> {p.bedId}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;