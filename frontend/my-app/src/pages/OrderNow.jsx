import React, { useEffect, useMemo, useState } from "react";
//import UserDropdown from "./UserDropdown";
import UserDropdown from "./testing";
import axios from "axios";
import toast from "react-hot-toast";

const RatingStars = ({ value = 4.5 }) => {
  return (
    <div style={{ color: "#ffb703", fontWeight: 700 }}>
      ★★★★☆ <span style={{ color: "#999", fontWeight: 400 }}>({value})</span>
    </div>
  );
};

const OrderNow = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  // INR formatter
  const formatINR = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Selected item
  const selectedItem = useMemo(() => {
    return items.find((i) => i._id === selectedId) || null;
  }, [items, selectedId]);

  // Cart item count
  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Add to cart
  const addToCart = (item, qty) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p._id === item._id);
      if (existing) {
        return prevCart.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + qty }
            : p
        );
      }
      return [...prevCart, { ...item, quantity: qty }];
    });
    toast.success("Item added to cart");
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    toast.success("Item removed from cart");
  };

  // Update cart qty
  const updateCartQuantity = (itemId, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(1, newQty) }
          : item
      )
    );
  };

  // Calculate total
  const totalBill = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Filter items by search
  const filtered = useMemo(() => {
    return items.filter((it) =>
      it.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // Fetch items (dummy example)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        // Replace with your API
        const res = await axios.get("http://localhost:4000/api/v1/food-items");
        setItems(res.data.items || []);
      } catch (err) {
        toast.error("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      {/* Navbar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "#ff914d",
              letterSpacing: 1,
            }}
          >
            HAPPY
          </span>
          <button
            onClick={() => (window.location.href = "/")}
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
            Home
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* LOGOUT button to the left of Hello {user} */}
          {(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              return <>
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
                <span style={{ padding: "0.5rem 1.2rem", background: "#fff", color: "#ff914d", border: "2px solid #ff914d", borderRadius: 8, fontWeight: 700 }}>
                  Hello {user.name}
                </span>
              </>;
            } else {
              return <UserDropdown />;
            }
          })()}
        </div>
      </div>

      {/* Main Content */}
      <section
        style={{
          background: "#fff7f0",
          minHeight: "80vh",
          padding: "2rem 0",
          paddingTop: "110px", // Add top padding so content is not hidden behind navbar
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: "1.25rem",
            marginTop: "90px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <h1 style={{ color: "#ff914d" }}>Order Now</h1>
              <button
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user"));
                  if (!user) {
                    window.location.href = "/login";
                  } else {
                    setShowCart(!showCart);
                  }
                }}
                style={{
                  padding: "0.6rem 1.2rem",
                  background: "#ff914d",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                🛒 View Cart ({cartItemCount})
              </button>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "0.6rem 0.8rem",
                  border: "1px solid #ff914d",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: "center", color: "#ff914d" }}>
              Loading...
            </div>
          ) : showCart ? (
            // Cart view
            <div
              style={{
                border: "1px solid #ffeadf",
                borderRadius: 12,
                padding: 20,
                background: "#fff7f0",
              }}
            >
              <h2
                style={{
                  color: "#ff914d",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                Your Cart
              </h2>
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#777",
                    padding: "2rem",
                  }}
                >
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
                    {cart.map((item) => (
                      <div
                        key={item._id}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr auto auto",
                          gap: 16,
                          alignItems: "center",
                          padding: "1rem",
                          background: "#fff",
                          borderRadius: 8,
                          border: "1px solid #ffeadf",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 700 }}>{item.title}</div>
                          <div style={{ color: "#666" }}>
                            {formatINR(item.price)} each
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity - 1)
                            }
                            style={{
                              padding: "0.3rem 0.7rem",
                              borderRadius: 6,
                              border: "1px solid #ff914d",
                              background: "#fff",
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{ minWidth: 30, textAlign: "center" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity + 1)
                            }
                            style={{
                              padding: "0.3rem 0.7rem",
                              borderRadius: 6,
                              border: "1px solid #ff914d",
                              background: "#fff",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 700 }}>
                            {formatINR(item.price * item.quantity)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            style={{
                              color: "#ff4444",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: 12,
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      padding: "1rem",
                      background: "#fff",
                      borderRadius: 8,
                      border: "1px solid #ffeadf",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#ff914d",
                      }}
                    >
                      Total: {formatINR(totalBill)}
                    </div>
                    <button
                      onClick={() => toast.success("Order placed successfully!")}
                      style={{
                        marginTop: 12,
                        padding: "0.8rem 2rem",
                        background: "#ff914d",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Place Order
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Item list view
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: 20,
              }}
            >
              <div
                style={{
                  border: "1px solid #ffeadf",
                  borderRadius: 12,
                  padding: 12,
                  background: "#fff7f0",
                }}
              >
                {["breakfast", "lunch", "dinner"].map((cat) => (
                  <div key={cat} style={{ marginBottom: 32 }}>
                    <h2
                      style={{
                        color: "#ff914d",
                        marginBottom: 12,
                        fontSize: 22,
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    >
                      {cat}
                    </h2>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: 12,
                      }}
                    >
                      {filtered
                        .filter((it) => it.category === cat)
                        .map((it) => (
                          <button
                            key={it._id}
                            onClick={() => {
                              setSelectedId(it._id);
                              setQuantity(1);
                            }}
                            style={{
                              textAlign: "left",
                              border:
                                selectedId === it._id
                                  ? "2px solid #ff914d"
                                  : "1px solid #ffeadf",
                              background: "#fff",
                              borderRadius: 12,
                              padding: 10,
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={it.image}
                              alt={it.title}
                              style={{
                                width: "100%",
                                height: 120,
                                objectFit: "cover",
                                borderRadius: 8,
                                marginBottom: 8,
                              }}
                            />
                            <div style={{ fontWeight: 700 }}>{it.title}</div>
                            <div style={{ color: "#666", fontSize: 14 }}>
                              {it.category}
                            </div>
                            <div
                              style={{
                                marginTop: 6,
                                fontWeight: 700,
                              }}
                            >
                              {formatINR(it.price)}
                            </div>
                          </button>
                        ))}
                      {filtered.filter((it) => it.category === cat).length ===
                        0 && (
                        <div
                          style={{
                            color: "#777",
                            gridColumn: "1 / -1",
                            textAlign: "center",
                            padding: 20,
                          }}
                        >
                          No {cat} items found.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  border: "1px solid #ffeadf",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                {selectedItem ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr",
                      gap: 16,
                      alignItems: "start",
                    }}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      style={{
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                    <div>
                      <h2
                        style={{
                          color: "#333",
                          marginBottom: 6,
                        }}
                      >
                        {selectedItem.title}
                      </h2>
                      <RatingStars value={4.5} />
                      <div
                        style={{
                          color: "#666",
                          marginTop: 10,
                        }}
                      >
                        {selectedItem.description || ""}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginTop: 16,
                        }}
                      >
                        <strong style={{ fontSize: 22 }}>
                          {formatINR(selectedItem.price)}
                        </strong>
                        <div
                          style={{
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <button
                            onClick={() =>
                              setQuantity((q) => Math.max(1, q - 1))
                            }
                            style={{
                              padding: "0.3rem 0.7rem",
                              borderRadius: 8,
                              border: "1px solid #ff914d",
                              background: "#fff",
                            }}
                          >
                            -
                          </button>
                          <span style={{ minWidth: 24, textAlign: "center" }}>
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity((q) => q + 1)}
                            style={{
                              padding: "0.3rem 0.7rem",
                              borderRadius: 8,
                              border: "1px solid #ff914d",
                              background: "#fff",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(selectedItem, quantity)}
                        style={{
                          marginTop: 16,
                          padding: "0.9rem 1.6rem",
                          background: "#ff914d",
                          color: "#fff",
                          border: "none",
                          borderRadius: 10,
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ color: "#777" }}>
                    Select an item to view details.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderNow;


