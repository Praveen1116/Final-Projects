import { Index } from "./pages/Index";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Courses } from "./pages/Courses";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { AdminSignin } from "./Admin/AdminSignin";
import { AdminSignup } from "./Admin/AdminSignup";
import { Privacy } from "./pages/Privacy";
import { AddCourse } from "./Admin/AddCourse";
import { UpdateCourse } from "./Admin/UpdateCourse";
import { MyCourses } from "./pages/MyCourses";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/update-course" element={<UpdateCourse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
