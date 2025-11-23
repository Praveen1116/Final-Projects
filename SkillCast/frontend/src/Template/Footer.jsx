import { Linkedin, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <>
            <div className="foot-elements">
                <hr style={{ color: "wheat", width: "90%", marginLeft: "4.5rem", textAlign: "center" }} />

                <div className="foot-material">
                    <div className="logo" style={{ fontSize: "2rem" }}>SkillMosaic</div>

                    <div className="listing">
                        <Link to="/adminsignin">Admin</Link>
                        <Link to="/">Home</Link>
                        <Link to="/courses">Courses</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="https://www.linkedin.com/in/praveenkumaryadav1611/" target='_blanck'>Support</Link>
                        <Link to="refund">Refund</Link>
                    </div>

                    <div className="contact">
                        <Link to="https://www.linkedin.com/in/praveenkumaryadav1611/" id='LinkedIn'><Linkedin /></Link>
                        <Link to="https://x.com/Praveen18611166" id='Twitter'><Twitter /></Link>
                        <Link to="https://github.com/Praveen1116" id='Github'><Github /></Link>
                    </div>
                </div>

                <hr style={{ color: "wheat", width: "90%", marginTop: "3rem", marginLeft: "4.5rem", textAlign: "center" }} />

                <p style={{ textAlign: "center", marginTop: "1rem" }}>Copyright ©️ 2025 Hyper</p>
                <p style={{ textAlign: "center", marginTop: "0.3rem", fontWeight: "bold", marginBottom: "-1rem" }}>All rights reserved</p>
            </div>
        </>
    )
}