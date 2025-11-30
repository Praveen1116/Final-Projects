import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Template/Footer";
import { Header } from "../Template/Header";
import { useState } from "react";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    //setError("");
    try {
      const response = await fetch("https://acadify.onrender.com/api/v1/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/my-courses");
      } else {
        if (
          data.message &&
          data.message.toLowerCase().includes("You are not registered")
        ) {
          setError("User not found. Please register first");
        } else if (
          data.message &&
          data.message.toLowerCase().includes("incorrect")
        ) {
          setError("Incorrect Password");
        } else {
          setError(data.message || "Signin failed");
        }
      }
    } catch (err) {
      setError("Network Error");
    }
  };

  return (
    <>
      <Header />
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
            to="/signup"
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

      <Footer />
    </>
  );
}
