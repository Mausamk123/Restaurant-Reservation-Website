import React, { useState } from "react";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            padding: "0.5rem 1.2rem",
            background: "#fff",
            color: "#ff914d",
            border: "2px solid #ff914d",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 1px 6px rgba(255,145,77,0.08)",
          }}
        >
          Login
        </button>
        <button
          onClick={() => (window.location.href = "/signup")}
          style={{
            padding: "0.5rem 1.2rem",
            background: "#ff914d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 1px 6px rgba(255,145,77,0.12)",
          }}
        >
          Sign Up
        </button>
      </>
    );
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => {
          setOpen((v) => !v);
          console.log("Dropdown open:", !open); // debug
        }}
        style={{
          padding: "0.5rem 1.2rem",
          background: "#fff",
          color: "#ff914d",
          border: "2px solid #ff914d",
          borderRadius: 8,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 1px 6px rgba(255,145,77,0.08)",
        }}
      >
        Hello {user.name}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "red", // 🔥 test visibility
            color: "white",
            fontSize: "20px",
            padding: "2rem",
            zIndex: 999999,
          }}
        >
          DROPDOWN TEST
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            style={{
              display: "block",
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "white",
              color: "red",
              fontWeight: 700,
              border: "1px solid red",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
