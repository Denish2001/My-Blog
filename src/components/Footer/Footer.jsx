import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/* ================================================================
   CONSTANTS
================================================================ */
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/AllStories", label: "Stories" },
  { to: "/About", label: "About" },
  { to: "/Team", label: "Team" },
  { to: "/Contact", label: "Contact" },
];

const SOCIALS = [
  {
    name: "twitter",
    label: "X (Twitter)",
    href: "https://twitter.com",
  },
  {
    name: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    name: "email",
    label: "Email us",
    href: "mailto:contact@kimc2025.com",
  },
];

/* ================================================================
   ICONS
================================================================ */
const ICONS = {
  twitter:
    "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  email:
    "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  arrow: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
};

const Icon = ({ name, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`icon ${className}`.trim()}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={ICONS[name]} />
  </svg>
);

/* ================================================================
   NEWSLETTER FORM
================================================================ */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("That email doesn't look quite right.");
      return;
    }

    setStatus("submitting");

    // No backend — simulate honestly. Swap this for a real API call.
    await new Promise((r) => setTimeout(r, 700));

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus(null), 4000);
  };

  if (status === "success") {
    return (
      <div className="footer-news__success" role="status" aria-live="polite">
        <Icon name="check" className="footer-news__success-icon" />
        <div>
          <p className="footer-news__success-title">You're subscribed.</p>
          <p className="footer-news__success-text">
            We'll email you when a new story lands.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="footer-news" onSubmit={handleSubmit} noValidate>
      <label htmlFor="footer-news-email" className="visually-hidden">
        Email address
      </label>
      <div className="footer-news__field">
        <input
          id="footer-news-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className="footer-news__input"
          aria-invalid={!!error}
          aria-required="true"
          disabled={status === "submitting"}
        />
        <button
          type="submit"
          className="footer-news__btn"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "…" : "Subscribe"}
          {status !== "submitting" && (
            <Icon name="arrow" className="icon--sm" />
          )}
        </button>
      </div>
      {error && (
        <p className="footer-news__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

/* ================================================================
   FOOTER
================================================================ */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* ============================================================
            MAIN GRID
        ============================================================ */}
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Home">
              <img
                src="/Logo.png"
                alt="The PGD Blog Logo"
                className="footer__logo-img"
              />
              <span className="footer__brand-text">
                <span className="footer__brand-name">The PGD Blog</span>
                <span className="footer__brand-meta">KIMC 2025</span>
              </span>
            </Link>

            <p className="footer__tagline">
              Reporting, essays, and commentary from KIMC's Postgraduate Mass
              Communication Class of 2025.
            </p>

            <div className="footer__socials" aria-label="Follow us">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="footer__social"
                  aria-label={s.label}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <nav className="footer__col" aria-labelledby="footer-nav-heading">
            <h3 id="footer-nav-heading" className="footer__heading">
              Navigate
            </h3>
            <ul className="footer__links">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__links">
              <li>
                <a href="mailto:editor@pgdblog.com" className="footer__link">
                  editor@pgdblog.com
                </a>
              </li>
              <li>
                <a href="mailto:hello@pgdblog.com" className="footer__link">
                  hello@pgdblog.com
                </a>
              </li>
              <li>
                <a href="tel:+254206001000" className="footer__link">
                  +254 (0)20 600 1000
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="footer__col footer__col--news">
            <h3 className="footer__heading">Stay in the loop</h3>
            <p className="footer__subtext">
              New stories, once a week. No noise.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* ============================================================
            BOTTOM BAR
        ============================================================ */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} KIMC Postgraduate Mass Communication Class.
          </p>

          <ul className="footer__legal">
            <li>
              <Link to="/privacy" className="footer__legal-link">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="footer__legal-link">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="footer__legal-link">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
