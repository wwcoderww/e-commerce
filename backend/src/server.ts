import app from "./app.js";

const PORT = process.env.NODE_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
