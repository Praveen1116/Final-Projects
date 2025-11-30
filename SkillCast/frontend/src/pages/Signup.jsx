import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Template/Footer";
import { Header } from "../Template/Header";
import { useState } from "react";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    //setError("");
    try {
      const response = await fetch("https://acadify.onrender.com/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();
      if (
        response.ok ||
        data.token ||
        data.message?.toLowerCase().includes("success")
      ) {
        //navigate("/signin");
        setError("User already exists, Please Login!!");
        return;
      } else {
        if (
          data.message &&
          data.message.toLowerCase().includes("You are already registered")
        ) {
          setError("User already exists, Please Login");
        } else {
          setError(data.message || "Signup failed");
        }
      }
    } catch (err) {
      setError("Server Error");
    }
  };
  return (
    <>
      <Header />
      <div className="signupform">
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
        <input
          type="text"
          placeholder="First Name..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button id="signup-btn" onClick={handleSignup}>
          Signup
        </button>
        {error && (
          <div style={{ color: "red", margin: "0.5rem 0" }}>{error}</div>
        )}
      </div>

      <Footer />
    </>
  );
}
