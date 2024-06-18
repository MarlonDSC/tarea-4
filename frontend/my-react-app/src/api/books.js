const API_URL = "https://your-backend-url"; // Replace with the actual backend URL

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  return response.json();
};

export const createBook = async (book) => {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
};

export const updateBook = async (id, book) => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
};

export const deleteBook = async (id) => {
  await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
};