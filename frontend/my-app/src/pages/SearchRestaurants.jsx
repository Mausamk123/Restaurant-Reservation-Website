import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const cuisineOptions = [
  "All", "Italian", "Pizza", "Japanese", "American", "Indian", "Mexican", "Vegetarian", "Chinese", "Seafood", "Bakery"
];

const SearchRestaurants = () => {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const params = {};
        if (query) params.search = query;
        if (cuisine && cuisine !== "All") params.cuisine = cuisine;
        const { data } = await axios.get("http://localhost:4000/api/v1/restaurants", { params });
        setRestaurants(data.restaurants);
      } catch (err) {
        setRestaurants([]);
      }
      setLoading(false);
    };
    fetchRestaurants();
  }, [query, cuisine]);

  

  return (
    <section className="search-restaurants" style={{ minHeight: "80vh", background: "#fff7f0", padding: "3rem 0" }}>
      <div className="container" style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "2.5rem 2rem" }}>
        <h1 style={{ textAlign: "center", color: "#ff914d", marginBottom: 24, fontWeight: 700, fontSize: 32, letterSpacing: 1 }}>Search Restaurants</h1>
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 2,
              minWidth: 180,
              padding: "0.9rem 1.2rem",
              fontSize: 18,
              border: "1.5px solid #ff914d",
              borderRadius: 8,
              outline: "none",
              background: "#fff7f0"
            }}
          />
          <select
            value={cuisine}
            onChange={e => setCuisine(e.target.value)}
            style={{
              flex: 1,
              minWidth: 120,
              padding: "0.9rem 1.2rem",
              fontSize: 18,
              border: "1.5px solid #ff914d",
              borderRadius: 8,
              background: "#fff7f0"
            }}
          >
            {cuisineOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", color: "#ff914d", fontSize: 22, padding: "2rem 0" }}>Loading...</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {restaurants.length ? (
              restaurants.map((r) => {
                const expanded = expandedId === r._id;
                return (
                  <li
                    key={r._id}
                    style={{
                      background: expanded ? "#fff" : "#fff7f0",
                      borderRadius: 12,
                      marginBottom: 22,
                      padding: expanded ? "2rem 2rem" : "1.1rem 1.5rem",
                      boxShadow: "0 2px 8px rgba(255,145,77,0.07)",
                      display: "flex",
                      flexDirection: expanded ? "column" : "row",
                      alignItems: expanded ? "flex-start" : "center",
                      gap: expanded ? 18 : 24,
                      fontSize: 20,
                      fontWeight: 500,
                      color: "#333",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onClick={() => setExpandedId(expanded ? null : r._id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 18, width: "100%" }}>
                      <span style={{ fontSize: 36, marginRight: 10 }}>{r.icon || "🍽️"}</span>
                      <img
                        src={r.image}
                        alt={r.name}
                        style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#ff914d", fontWeight: 700, fontSize: 22 }}>{r.name}</div>
                        <div style={{ color: "#888", fontSize: 16 }}>{r.location} &middot; <span style={{ color: "#333" }}>{r.cuisine}</span></div>
                      </div>
                    </div>
                    {expanded && (
                      <div style={{ marginTop: 18, width: "100%" }}>
                        <div style={{ color: "#333", fontSize: 18, marginBottom: 10 }}>
                          <strong>Name:</strong> {r.name}
                        </div>
                        <div style={{ color: "#333", fontSize: 18, marginBottom: 10 }}>
                          <strong>Location:</strong> {r.location}
                        </div>
                        <div style={{ color: "#333", fontSize: 18, marginBottom: 10 }}>
                          <strong>Cuisine:</strong> {r.cuisine}
                        </div>
                        <div style={{ color: "#333", fontSize: 18, marginBottom: 10 }}>
                          <strong>Image:</strong> <img src={r.image} alt={r.name} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 12, marginLeft: 10, verticalAlign: "middle" }} />
                        </div>
                        {/* Add more details here if available */}
                        {/* Reserve removed for single-restaurant site */}
                        {/* <button
                          style={{
                            marginTop: 18,
                            padding: "0.8rem 2rem",
                            fontSize: "1.1rem",
                            background: "#ff914d",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600
                          }}
                          onClick={e => { e.stopPropagation(); }}
                        >
                          Reserve
                        </button> */}
                      </div>
                    )}
                  </li>
                );
              })
            ) : (
              <li style={{ textAlign: "center", color: "#888", fontSize: 18, padding: "1.5rem 0" }}>No restaurants found.</li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchRestaurants;
