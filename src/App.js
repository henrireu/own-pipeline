import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    // Tarkistetaan, että name ja price eivät ole tyhjiä
    if (!name || !price) {
      alert("Both name and price are required!");
      return;
    }

    const newItem = { name, price: parseFloat(price) };  // parseFloat price varmistaa, että se on luku

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        fetchItems(); // Päivitetään lista
        setName("");  // Tyhjennetään kenttä
        setPrice("");  // Tyhjennetään kenttä
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Simple webshop</h1>
      Name{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}  // Päivittää 'name' arvon
      />
      Price{" "}
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}  // Päivittää 'price' arvon
      />
      <button onClick={handleClick}>Add</button>
      <h2>Items:</h2>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </main>
  );
}

export default App;