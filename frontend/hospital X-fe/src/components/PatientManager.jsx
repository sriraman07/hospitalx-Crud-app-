import { useState, useEffect } from "react";
import API from "../services/api";

function PatientManager() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", bedId: "" });
  const [search, setSearch] = useState("");

  // fetch patients
  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // add patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/patients", form);
      setForm({ name: "", bedId: "" });
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // search filter
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.bedId.includes(search)
  );

  return (
    <div>
      <h2>Patient Manager</h2>

      {/* Search */}
      <input
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Patient Form */}
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
        <button>Add Patient</button>
      </form>

      {/* Patient List */}
      <div>
        <h3>Patients</h3>
        {filteredPatients.length === 0 ? (
          <p>No patients found</p>
        ) : (
          filteredPatients.map((p) => (
            <div key={p._id}>
              <p>Name: {p.name}</p>
              <p>Bed ID: {p.bedId}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientManager;