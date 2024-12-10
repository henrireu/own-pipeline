/* eslint-disable no-undef */
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

const items = [
  {
    name: "Laptop",
    price: 500,
  },
  {
    name: "Desktop",
    price: 700,
  },
];

app.get("/api/items", (req, res) => {
  res.send(items);
});

app.get('/health', (req, res) => {
  // eslint-disable-next-line no-constant-condition
  if (true) throw('error...  ')
  res.send('okk')
})

app.post("/api/items", (req, res) => {
  const item = req.body;
  items.push(item);

  res.status(201).json({ message: "Item added successfully", items });
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));