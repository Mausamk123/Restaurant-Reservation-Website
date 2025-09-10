
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://happy-frontend.onrender.com//api/v1/auth/signup", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <section className="signup" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff7f0" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 340 }}>
        <h2 style={{ color: "#ff914d", marginBottom: 18 }}>Sign Up</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ff914d" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ff914d" }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} style={{ width: "100%", marginBottom: 18, padding: 10, borderRadius: 8, border: "1px solid #ff914d" }} />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 12, background: "#ff914d", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16 }}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
};

export default Signup;
