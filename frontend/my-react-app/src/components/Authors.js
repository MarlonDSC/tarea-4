import React, { useState, useEffect } from "react";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../api/authors";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: "", bio: "" });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const data = await getAuthors();
    setAuthors(data);
  };

  const handleCreate = async () => {
    await createAuthor(newAuthor);
    setNewAuthor({ name: "", bio: "" });
    fetchAuthors();
  };

  const handleUpdate = async (id) => {
    const name = prompt("Enter new name:");
    const bio = prompt("Enter new bio:");
    await updateAuthor(id, { name, bio });
    fetchAuthors();
  };

  const handleDelete = async (id) => {
    await deleteAuthor(id);
    fetchAuthors();
  };

  return (
    <div>
      <h1>Authors</h1>
      <input
        type="text"
        placeholder="Name"
        value={newAuthor.name}
        onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Bio"
        value={newAuthor.bio}
        onChange={(e) => setNewAuthor({ ...newAuthor, bio: e.target.value })}
      />
      <button onClick={handleCreate}>Add Author</button>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.name} - {author.bio}
            <button onClick={() => handleUpdate(author.id)}>Edit</button>
            <button onClick={() => handleDelete(author.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;