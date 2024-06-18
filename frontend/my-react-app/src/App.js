import React from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";

function App() {
  return (
    <div className="App">
      <h1>Library Management</h1>
      <Authors />
      <Books />
    </div>
  );
}

export default App;
