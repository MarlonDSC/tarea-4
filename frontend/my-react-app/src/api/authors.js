const API_URL = "https://your-backend-url"; // Replace with the actual backend URL

export const getAuthors = async () => {
  const response = await fetch(`${API_URL}/authors`);
  return response.json();
};

export const createAuthor = async (author) => {
  const response = await fetch(`${API_URL}/authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  return response.json();
};

export const updateAuthor = async (id, author) => {
  const response = await fetch(`${API_URL}/authors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  });
  return response.json();
};

export const deleteAuthor = async (id) => {
  await fetch(`${API_URL}/authors/${id}`, {
    method: "DELETE",
  });
};