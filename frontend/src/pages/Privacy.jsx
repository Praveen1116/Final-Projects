import { Footer } from "../Template/Footer";
import { Header } from "../Template/Header";

export function Privacy() {
  return (
    <>
      <Header />
      <section
        style={{
          maxWidth: "900px",
          margin: "3rem auto",
          padding: "2.5rem 2rem",
          background: "linear-gradient(135deg, #f8fafc 70%, #e0e7ff 100%)",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px rgba(60,60,120,0.10)",
          fontFamily: "'Zen Dots', 'Rubik Pixels', 'Kugile', sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#4f46e5",
            fontSize: "2.7rem",
            marginBottom: "1.2rem",
            letterSpacing: "2px",
            fontFamily: "'Zen Dots', cursive",
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "1.2rem",
            marginBottom: "2.5rem",
            fontWeight: 500,
          }}
        >
          Your privacy matters to us. Here’s how we protect and use your data at <span style={{ color: "#16a34a", fontWeight: "bold" }}>SkillMosaic</span>.
        </p>
        <div style={{ lineHeight: 1.8, color: "#22223b" }}>
          <h2 style={{ color: "#6366f1", marginTop: "2rem" }}>What We Collect</h2>
          <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li>Basic info: name, email, and profile details you provide.</li>
            <li>Usage data: pages you visit, actions you take, and device info.</li>
            <li>Feedback and messages you send us.</li>
          </ul>
          <h2 style={{ color: "#6366f1", marginTop: "2rem" }}>How We Use It</h2>
          <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li>To personalize your learning experience.</li>
            <li>To improve our courses and platform.</li>
            <li>To communicate important updates and offers.</li>
            <li>To keep SkillMosaic safe and secure.</li>
          </ul>
          <h2 style={{ color: "#6366f1", marginTop: "2rem" }}>Your Rights & Choices</h2>
          <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li>Access, update, or delete your data anytime.</li>
            <li>Opt out of marketing emails with one click.</li>
            <li>Contact us for any privacy concerns.</li>
          </ul>
          <h2 style={{ color: "#6366f1", marginTop: "2rem" }}>Cookies & Tracking</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We use cookies to make SkillMosaic smoother and smarter. You can control cookies in your browser settings.
          </p>
          <h2 style={{ color: "#6366f1", marginTop: "2rem" }}>Contact Us</h2>
          <p>
            Have questions? Reach out at{" "}
            <a
              href="mailto:kpraveen1116@gmail.com"
              style={{ color: "#4f46e5", textDecoration: "underline" }}
            >
              kpraveen1116@gmail.com
            </a>
            . We’re here to help!
          </p>
        </div>
        <div
          style={{
            marginTop: "2.5rem",
            textAlign: "center",
            color: "#64748b",
            fontSize: "1rem",
            fontStyle: "italic",
          }}
        >
          Last updated: November 2025
        </div>
      </section>
      <Footer />
    </>
  );
}