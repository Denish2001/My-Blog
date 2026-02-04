// Navbar.js
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./CSS/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Refined SVG icons
  const MenuIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="menu-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="close-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const LogoIcon = () => (
    <svg viewBox="0 0 32 32" className="logo-icon" fill="currentColor">
      <rect x="6" y="6" width="20" height="20" rx="2" />
      <path d="M12 10h8v2h-8zM12 14h8v2h-8zM12 18h5v2h-5z" fill="white" />
    </svg>
  );

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/AllStories", label: "Stories" },
    { path: "/About", label: "About" },
    { path: "/Team", label: "Team" },
    { path: "/Contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="logo-wrapper">
              {/* If you have Logo.png, use img. Otherwise use the icon */}
              <img
                src="Logo.png"
                alt=""
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="logo-fallback" style={{ display: "none" }}>
                <LogoIcon />
              </div>
              <div className="logo-text-wrapper">
                <span className="logo-text">The PGD Blog</span>
                <span className="logo-subtitle">KIMC 2025</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "nav-link-active" : ""}`}
              >
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-link-indicator"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar-toggle ${isMenuOpen ? "toggle-active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="toggle-icon">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="navbar-progress"></div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <span className="mobile-menu-title">Navigation</span>
            <button
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="mobile-nav">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? "mobile-nav-link-active" : ""}`}
                onClick={closeMenu}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="mobile-nav-number">0{index + 1}</span>
                <span className="mobile-nav-text">{link.label}</span>
                <span className="mobile-nav-arrow">→</span>
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-footer-text">
              <p className="footer-label">KIMC Postgraduate</p>
              <p className="footer-info">Mass Communication Class of 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="navbar-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Navbar;
