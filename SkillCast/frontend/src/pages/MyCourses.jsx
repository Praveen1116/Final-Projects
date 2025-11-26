import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function MyCourses() {
  const [courses, setCourses] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/purchases", {
        headers: { Authorization: `${userToken}` },
      })
      .then((res) => setCourses(res.data.purchasedCourses))
      .catch((err) => setCourses([]));
  }, [userToken]);

  return (
    <>
      <h3
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        My Courses
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginRight: "4rem",
          marginTop: "1.5rem",
        }}
      >
        <Link
          to="/courses"
          style={{
            textDecoration: "none",
          }}
        >
          <button
            style={{
              padding: "1rem",
              borderRadius: "1rem",
              color: "black",
              background: "#db6769ff",
              width: "140px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </Link>
      </div>

      <div className="show-courses">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <img src={course.imageURL} alt={course.title} />
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>
              <b>Price:</b> ₹{course.price}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
