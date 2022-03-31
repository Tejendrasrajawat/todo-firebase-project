import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseInit";
import "./Read.css";
import { deleteDoc } from "firebase/firestore";

function Read() {
  const [todo, setTodo] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const handleRead = () => {
    onSnapshot(collection(db, "todo"), (snapshot) => {
      // use spread op to get id and data
      setTodo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleUpdate = async (e) => {
    console.log(id);
    e.preventDefault();
    const Ref = doc(db, "todo", id);
    try {
      await updateDoc(Ref, {
        title: title,
        description: description,
      });
    } catch (err) {
      alert(err);
    }
    setShowUpdate(false);
  };

  const handleDelete = async (id) => {
    const Ref = doc(db, "todo", id);
    try {
      await deleteDoc(Ref);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);

  return (
    <>
      {todo.map((task) => {
        return (
          <div className="todo" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="buttons">
              {/* Button to open modal */}
              <button
                onClick={() => {
                  setId(task.id);
                  setShowUpdate(true);
                }}
                style={{ border: "1px solid black", padding: "0.8rem" }}
              >
                Update
              </button>
              {/* Button to delete */}
              <button
                onClick={() => {
                  handleDelete(task.id);
                }}
                style={{ border: "1px solid black", padding: "0.8rem" }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal form */}
      {showUpdate ? (
        <form onSubmit={handleUpdate} className="updateTask" name="updateTask">
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
          <button type="submit" className="update">
            Update Task
          </button>
        </form>
      ) : null}
    </>
  );
}

export default Read;
