import signupIcon from "../assets/user.png";
import carticon from "../assets/cart.png";
import logo from "../assets/image.png";
import "./NavbarCss.css";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="brand">
            <a href="http://localhost:5173/landing">
                <img src={logo} alt="Logo" className="brand-logo" />
            </a>
        </div>
        <div className="logo">
            <a href="http://localhost:5173/signin">
            <img src={signupIcon} alt="Signup Icon" className="nav-icon"  />
            </a>
          <img src={carticon} alt="Cart Icon" className="nav-icon" />
        </div>
      </nav>
    </div>
  );
}
