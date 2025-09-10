import app from "./app.js";

const PORT = process.env.PORT || 4000;   // ✅ Use Render's PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
