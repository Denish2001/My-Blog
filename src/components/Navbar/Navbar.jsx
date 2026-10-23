import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/* ------------------------------------------------------------------
   Constants
------------------------------------------------------------------ */
const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/AllStories', label: 'Stories' },
  { path: '/Magazine', label: 'Magazine' }, // <-- Added
  { path: '/About', label: 'About' },
  { path: '/Team', label: 'Team' },
  { path: '/Contact', label: 'Contact' },
];

/* ------------------------------------------------------------------
   Icons
------------------------------------------------------------------ */
const ICONS = {
  menu: (
    <>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  arrow: (
    <path
      d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

const Icon = ({ name, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`icon ${className}`.trim()}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    {ICONS[name]}
  </svg>
);

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------ */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const { pathname } = useLocation();

  const toggleRef = useRef(null);
  const drawerRef = useRef(null);
  const firstLinkRef = useRef(null);

  /* ---- Scroll state (passive, threshold-gated) ---- */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Close on route change ---- */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* ---- Lock body scroll while drawer open ---- */
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  /* ---- Focus management: focus trap + return focus ---- */
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    const trigger = toggleRef.current;
    if (!drawer) return;

    // Focus first link when opened
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus(),
      50
    );

    // Trap focus inside drawer
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      trigger?.focus();
    };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  const isActive = (path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <>
      {/* ============================================================
          HEADER
      ============================================================ */}
      <header
        className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar__inner">
          {/* ---- Logo ---- */}
          <Link
            to="/"
            className="navbar__brand"
            onClick={close}
            aria-label="The PGD Blog — Home"
          >
            <span className="navbar__mark" aria-hidden="true">
              {!logoFailed ? (
                <img
                  src="Logo.png"
                  alt=""
                  className="navbar__mark-img"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="navbar__mark-fallback">P</span>
              )}
            </span>
            <span className="navbar__brand-text">
              <span className="navbar__brand-name">The PGD Blog</span>
              <span className="navbar__brand-meta">KIMC 2025</span>
            </span>
          </Link>

          {/* ---- Desktop nav ---- */}
          <nav className="navbar__links" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <span className="nav-link__indicator" aria-hidden="true" />
                </Link>
              );
            })}
          </nav>

          {/* ---- Mobile toggle ---- */}
          <button
            ref={toggleRef}
            type="button"
            className="navbar__toggle"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
          >
            <Icon name={isOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      {/* ============================================================
          MOBILE DRAWER
      ============================================================ */}
      <div
        className={`drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div
          className="drawer__overlay"
          onClick={close}
          tabIndex={-1}
          aria-hidden="true"
        />

        <div
          id="mobile-drawer"
          ref={drawerRef}
          className="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="drawer__header">
            <span className="label">Menu</span>
            <button
              type="button"
              className="drawer__close"
              onClick={close}
              aria-label="Close menu"
            >
              <Icon name="close" />
            </button>
          </div>

          <nav className="drawer__nav" aria-label="Mobile primary">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  ref={index === 0 ? firstLinkRef : undefined}
                  className={`drawer-link ${active ? 'is-active' : ''}`}
                  onClick={close}
                  aria-current={active ? 'page' : undefined}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <span className="drawer-link__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="drawer-link__label">{link.label}</span>
                  <Icon name="arrow" className="drawer-link__arrow" />
                </Link>
              );
            })}
          </nav>

          <div className="drawer__footer">
            <span className="label">KIMC Postgraduate</span>
            <p className="drawer__footer-text">
              Mass Communication Class of 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
