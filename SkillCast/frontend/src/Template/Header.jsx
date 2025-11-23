import { Link } from "react-router-dom";


export function Header() {
  return (
    <div className="container">
      <div className="nav-list">
        <div className="logo">SkillMosaic</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/signin">Login</Link>
        </nav>
      </div>
    </div>
  );
}