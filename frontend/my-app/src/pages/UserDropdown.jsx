
import React, { useState, useRef, useEffect } from "react";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If not logged in, show Login/Signup
  if (!user) {
    return (
      <>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{ padding: "0.5rem 1.2rem", background: "#fff", color: "#ff914d", border: "2px solid #ff914d", borderRadius: 8, fontWeight: 700, cursor: "pointer", marginRight: 8 }}
        >
          Login
        </button>
        <button
          onClick={() => (window.location.href = "/signup")}
          style={{ padding: "0.5rem 1.2rem", background: "#ff914d", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}
        >
          Sign Up
        </button>
      </>
    );
  }

  // Main return: show LOGOUT button to the left of Hello {user.name}
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8 }} ref={dropdownRef}>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        style={{ padding: "0.5rem 1.2rem", background: "#ff4444", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}
      >
        LOGOUT
      </button>
      <button
        onClick={e => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        style={{ padding: "0.5rem 1.2rem", background: "#fff", color: "#ff914d", border: "2px solid #ff914d", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}
      >
        Hello {user.name}
      </button>
    </div>
  );
};

export default UserDropdown;
