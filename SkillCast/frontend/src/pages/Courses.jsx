import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Template/Footer";
import { Header } from "../Template/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://acadify.onrender.com/api/v1/course/preview")
      .then((res) => setCourses(res.data.courses))
      .catch(() => setCourses([]));
  }, []);

  function handlePurchase(courseId) {
    axios
      .post(
        `https://acadify.onrender.com/api/v1/user/purchase/${courseId}`,
        {},
        { headers: { Authorization: `${userToken}` } }
      )
      .then((res) => {
        alert(res.data.message);
        navigate("/my-courses");
      })
      .catch((err) => {
        alert("Error purchasing course");
      });
  }

  return (
    <>
      <Header />
      <h3
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        Courses
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
          gap: "0.5rem",
        }}
      >
        <button className="course-btn">
          <span>Courses</span>
        </button>
        <button className="course-btn">
          <span>
            <Link
              to="/my-courses"
              style={{ textDecoration: "none", color: "black" }}
            >
              My-Courses
            </Link>
          </span>
        </button>
      </div>

      <div className="show-courses">
        {courses.slice().reverse().map((course) => (
          <div className="course-card">
            <img src={course.imageURL} alt="Course 2" />
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p>
              <b>Price:</b> ₹{course.price}
            </p>
            <button onClick={() => handlePurchase(course._id)}>Buy Now</button>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
