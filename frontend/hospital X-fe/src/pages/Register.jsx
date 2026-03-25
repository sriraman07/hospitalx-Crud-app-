import { useState } from "react";
import "./register.css";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Hospital X</h1>
      <div className="form-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={form.username}
            placeholder="Enter username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            value={form.email}
            placeholder="mail@website.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            placeholder="********"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;