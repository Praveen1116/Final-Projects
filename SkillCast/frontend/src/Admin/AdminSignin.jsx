import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AdminHeader() {
  return (
    <div className="container">
      <div className="nav-list">
        <div className="logo">SkillMosaic</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-course">Add Courses</Link>
          <Link to="/adminsignin">Login</Link>
          <Link to="/signin">Student</Link>
        </nav>
      </div>
    </div>
  );
}
const style = { background: "black", width: "100%" };

export function AdminSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    //setError("");
    try {
      const response = await fetch("/api/v1/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/add-course");
      } else {
        if (
          data.message &&
          data.message.toLowerCase().includes("You are not registered")
        ) {
          setError("Admin not found. Please register first");
        } else if (
          data.message &&
          data.message.toLowerCase().includes("incorrect")
        ) {
          setError("Incorrect Password");
        } else {
          setError(data.message || "Admin's Signin failed");
        }
      }
    } catch (err) {
      setError("Network Error");
    }
  };
  return (
    <>
      <div style={style}>
        <AdminHeader />

        <div>
          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "-2rem",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Admin Signin
          </p>

          <div className="signinform">
            <input
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id="signin-btn" onClick={handleSignin}>
              Signin
            </button>

            {error && (
              <div style={{ color: "red", margin: "0.5rem 0" }}>{error}</div>
            )}
            
            <p>
              Haven't registered?{" "}
              <Link
                to="/adminsignup"
                style={{
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  color: "blue",
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
