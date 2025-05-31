import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSeedling } from "react-icons/fa";
import { logoutUser } from "../firebase";
import "./css/Navbar.css";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (!error) {
      navigate("/login");
      setDropdownOpen(false);
      window.scrollTo(0, 0);
    } else {
      console.error("Logout error:", error);
    }
  };

  const getRandomColor = () => {
    const darkColors = [
      "#4CAF50",
      "#8B4513",
      "#2F4F4F",
      "#483C32",
      "#006400",
      "#8A2BE2",
    ];
    return darkColors[Math.floor(Math.random() * darkColors.length)];
  };

  const [avatarColor, setAvatarColor] = useState(getRandomColor());

  useEffect(() => {
    setAvatarColor(getRandomColor());
  }, [user]);

  const getInitial = () => {
    return user && user.email ? user.email.charAt(0).toUpperCase() : "U";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".avatar-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => window.scrollTo(0, 0)}>
          <FaSeedling className="navbar-logo-icon" />
          <span>AgroVision</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link
              to="/"
              className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/about"
              className={`navbar-link ${location.pathname === "/about" ? "active" : ""}`}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              About Us
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/services"
              className={`navbar-link ${location.pathname === "/services" ? "active" : ""}`}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Services
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/help"
              className={`navbar-link ${location.pathname === "/help" ? "active" : ""}`}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              Help
            </Link>
          </li>
          {user && (
            <li className="navbar-item avatar-container">
              <button
                className="avatar-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ backgroundColor: avatarColor }} // Keep this dynamic style as it changes with state
              >
                {getInitial()}
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;