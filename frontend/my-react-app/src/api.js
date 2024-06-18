const API_URL = "https://your-backend-url"; // Replace with the actual backend URL

export const getItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  return response.json();
};

export const createItem = async (item) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const updateItem = async (id, item) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteItem = async (id) => {
  await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
  });
};