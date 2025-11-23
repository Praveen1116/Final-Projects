import { useState } from "react";
import { AdminHeader } from "./AdminSignin";

const style = { background: "black", width: "100%" };

export function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addCourse = async () => {
    setSuccess("");
    try {
      const response = await fetch("/api/v1/admin/course", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, price, image }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Course Added: ${title}`);
        setTitle("");
        setDescription("");
        setPrice("");
        setImage("");
      } else {
        setError(data.message || "Can't Add Course");
      }
    } catch (err) {
      setError("Database Error");
    }
  };
  return (
    <>
      <div style={style}>
        <AdminHeader />
        <div className="create-course">
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image... "
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button id="add-course" onClick={addCourse}>
            Add
          </button>
          {success && (
            <div style={{ color: "lightgreen", marginTop: "1rem" }}>
              {success}
            </div>
          )}
          {error && (
            <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
          )}
        </div>
      </div>
    </>
  );
}
