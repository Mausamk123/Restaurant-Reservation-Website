/*import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
  const { data } = await axios.post("http://localhost:4000/api/v1/auth/login", form);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  toast.success("Login successful!");
  navigate("/order-now");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <section className="login" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff7f0" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 340 }}>
        <h2 style={{ color: "#ff914d", marginBottom: 18 }}>Login</h2>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ff914d" }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} style={{ width: "100%", marginBottom: 18, padding: 10, borderRadius: 8, border: "1px solid #ff914d" }} />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 12, background: "#ff914d", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 16 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <span style={{ color: "#555", marginRight: 8 }}>Not a registered user?</span>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{ padding: "0.5rem 1.2rem", background: "#ff914d", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 15 }}
          >
            Sign Up!
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
*/
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://happy-restaurant.onrender.com/api/v1/auth/login",
        form
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      navigate("/order-now");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  // handle Google login success
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google User Info:", decoded);

    // save user data (in real app you’d verify via backend)
    localStorage.setItem("user", JSON.stringify(decoded));
    toast.success(`Welcome ${decoded.name}`);
    navigate("/order-now");
  };

  const handleGoogleError = () => {
    toast.error("Google Login Failed. Try again.");
  };

  return (
    <section
      className="login"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff7f0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: 340,
        }}
      >
        <h2 style={{ color: "#ff914d", marginBottom: 18 }}>Login</h2>

        {/* Email/Password Login */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            marginBottom: 12,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ff914d",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          style={{
            width: "100%",
            marginBottom: 18,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ff914d",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "#ff914d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Login Button */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
          <p style={{ marginTop: 8, color: "#555" }}>or</p>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              padding: "0.5rem 1.2rem",
              background: "#ff914d",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 15,
            }}
          >
            Sign Up!
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;

