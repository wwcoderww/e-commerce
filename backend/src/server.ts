import app from "./app.js";

const PORT = process.env.NODE_PORT || 8080;
const HOST = "0.0.0.0";

app.listen(Number(PORT), HOST, () => {
  console.log(`Server running on port ${PORT}...`);
});
