import { Footer } from "../Template/Footer";
import { Header } from "../Template/Header";

export function Courses() {
  return (
    <>
      <Header />
      <h3
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        Courses
      </h3>

      <div className="show-courses">
        <div className="course-card">
          <img
            src="https://imgs.search.brave.com/d_7H8zVn78AQqmzh4cFPJCRywF1lNHS7QLbyCwpb5Rw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2xpZGVzaGFyZWNk/bi5jb20vc3NfdGh1/bWJuYWlscy9nZHNj/MjQtbWVybnN0YWNr/LTI0MDMxMjA1MDMw/NS0zODRjMDJlZi10/aHVtYm5haWwuanBn/P3dpZHRoPTU2MCZm/aXQ9Ym91bmRz"
            alt="Course 1"
          />
          <h4>MERN Stack</h4>
          <p>Full MERN Stack from 0-100</p>
          <p>
            <b>Price:</b> ₹5499
          </p>
          <button>Buy Now</button>
        </div>
      </div>

      <Footer />
    </>
  );
}
