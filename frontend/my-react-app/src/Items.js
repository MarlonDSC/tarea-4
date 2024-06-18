import React, { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "./api";

const Items = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleCreate = async () => {
    const item = { name: newItem };
    await createItem(item);
    setNewItem("");
    fetchItems();
  };

  const handleUpdate = async (id) => {
    const item = { name: prompt("Enter new name:") };
    await updateItem(id, item);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div>
      <h1>Items</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleCreate}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleUpdate(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;