import { Link, useNavigate } from "react-router-dom";
import { AdminHeader } from "./AdminSignin";
import { useEffect, useState } from "react";

const style = { background: "black", width: "100%" };

export function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate("/adminsignin");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [redirect, navigate]);

  const handleSignup = async () => {
    //setError("");
    try {
      const response = await fetch("https://acadify.onrender.com/api/v1/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = response.json();

      if (response.ok) {
        setError("Admin created successfully, Redirecting to Login!!");
        setRedirect(true);
      } else {
        const msg = data.message?.toLowerCase() || "";
        if (
          msg.includes("already registered") ||
          msg.includes("exists") ||
          msg.includes("duplicate")
        ) {
          setError("Admin already exists! Redirecting to login...");
          setRedirect(true);
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
      <div style={style}>
        <AdminHeader />

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "-2rem",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Admin Signup
        </p>
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
      </div>
    </>
  );
}
