import React, { useState, useEffect } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../api/books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", authorId: "", publishedDate: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const handleCreate = async () => {
    await createBook(newBook);
    setNewBook({ title: "", authorId: "", publishedDate: "" });
    fetchBooks();
  };

  const handleUpdate = async (id) => {
    const title = prompt("Enter new title:");
    const authorId = prompt("Enter new author ID:");
    const publishedDate = prompt("Enter new published date:");
    await updateBook(id, { title, authorId, publishedDate });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div>
      <h1>Books</h1>
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author ID"
        value={newBook.authorId}
        onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Published Date"
        value={newBook.publishedDate}
        onChange={(e) => setNewBook({ ...newBook, publishedDate: e.target.value })}
      />
      <button onClick={handleCreate}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.authorId} - {book.publishedDate}
            <button onClick={() => handleUpdate(book.id)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;