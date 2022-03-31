import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseInit";
import "./Write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todo"), {
        title: title,
        description: description,
      });
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Add Task</button>
      </form>
    </>
  );
}

export default Write;
