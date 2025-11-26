import { useEffect, useState } from "react";
import { AdminHeader } from "./AdminSignin";

const style = { background: "black", width: "100%" };

export function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [myCourses, setMyCourses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  const token = localStorage.getItem("token");

  const fetchMyCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/admin/course/bulk", {
        headers: {
          "Authorization": token
        }
      });

      const data = await response.json();
      if(response.ok && data.courses) {
        setMyCourses(data.courses);
      } else {
        setMyCourses([]);
      }
    } catch {
      setMyCourses([]);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [success]);

  const addCourse = async () => {
    setSuccess("");
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/v1/admin/course", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ title, description, price: Number(price), imageURL: image }),
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

  const startEdit = (course) => {
    setEditId(course._id);
    setEditTitle(course.title);
    setEditDescription(course.description);
    setEditPrice(course.price);
    setEditImage(course.imageURL);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPrice("");
    setEditImage("");
  };

  const saveEdit = async () => {
    setError("");
    try {
      const response = await fetch(`http://localhost:3000/api/v1/admin/course/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          price: Number(editPrice),
          imageURL: editImage
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(`Course Updated: ${editTitle}`);
        cancelEdit();
        fetchMyCourses();
      } else {
        setError(data.message || "Can't Update Course");
      }
    } catch (err) {
      setError("Database Error");
    }
  };

  const deleteCourse = async (courseId) => {
    setError("");
    try {
      const response = await fetch(`http://localhost:3000/api/v1/admin/course/${courseId}`, {
        method: "DELETE",
        headers: {
          "Authorization": token
        }
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Course Deleted");
        fetchMyCourses();
      } else {
        setError(data.message || "Can't Delete Course");
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

        <div style={{ marginTop: "2rem", color: "white" }}>
          <h3 style={{textAlign: "center", fontSize: "2rem"}}>Your Created Courses</h3>
          <div className="show-courses">
            {myCourses.length === 0 && <p>No courses created yet.</p>}
            {myCourses.slice().reverse().map(course => (
              <div className="course-card" key={course._id}>
                {editId === course._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      placeholder="Title"
                      style={{padding: "0.5rem", borderRadius: "0.5rem", marginTop: "0.5rem"}}
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      placeholder="Description"
                      style={{padding: "0.5rem", borderRadius: "0.5rem", marginTop: "0.5rem"}}
                    />
                    <input
                      type="number"
                      value={editPrice}
                      onChange={e => setEditPrice(e.target.value)}
                      placeholder="Price"
                      style={{padding: "0.5rem", borderRadius: "0.5rem", marginTop: "0.5rem"}}
                    />
                    <input
                      type="text"
                      value={editImage}
                      onChange={e => setEditImage(e.target.value)}
                      placeholder="Image URL"
                      style={{padding: "0.5rem", borderRadius: "0.5rem", marginTop: "0.5rem"}}
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit} style={{background:"#aa4546ff"}}>Cancel</button>
                  </>
                ) : (
                  <>
                    <img src={course.imageURL} alt={course.title} />
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                    <p>
                      <b>Price:</b> ₹{course.price}
                    </p>
                    <button onClick={() => startEdit(course)}>Edit</button>
                    <button onClick={() => deleteCourse(course._id)} style={{color: "black", background: "red"}}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
