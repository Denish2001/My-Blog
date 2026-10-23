import { Link } from 'react-router-dom';
import './Magazine.css';

/* ================================================================
   CONSTANTS
================================================================ */
const MAGAZINE_DRIVE_ID = '1xX-1NFq3T21pt4pi_2JNgzKtgjmeeGNB';
const DOWNLOAD_URL = `https://drive.google.com/file/d/${MAGAZINE_DRIVE_ID}/view?usp=sharing`;
const FLIPBOOK_URL = 'https://heyzine.com/flip-book/5e31f7d5a9.html';

/* ================================================================
   ICONS
================================================================ */
const ICONS = {
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  arrow: 'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
};

const Icon = ({ name, className = '' }) => (
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
   PAGE
================================================================ */
const Magazine = () => {
  return (
    <div className="magazine-page">
      {/* ============================================================
          HERO
      ============================================================ */}
      <header className="magazine-hero">
        <div className="container magazine-hero__inner">
          <div className="magazine-hero__content">
            <h1 className="magazine-hero__title">
              The Trend: <br />
              <span className="text-accent">Becoming.</span>
            </h1>
            <p className="magazine-hero__lede">
              A journey that tested us in so many ways. We began as dreamers,
              each stepping into postgraduate study with ambition and
              uncertainty in equal measure. This is our voice.
            </p>

            <div className="magazine-hero__actions">
              <a
                href={FLIPBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <Icon name="book" />
                <span>Read online</span>
              </a>
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <Icon name="download" />
                <span>Download PDF</span>
              </a>
              <Link to="/AllStories" className="btn btn--link">
                <span>Browse articles</span>
                <Icon name="arrow" className="icon--sm" />
              </Link>
            </div>

            <div className="magazine-hero__meta">
              <div>
                <dt className="label">Published</dt>
                <dd>2026</dd>
              </div>
              <div>
                <dt className="label">Pages</dt>
                <dd>76</dd>
              </div>
              <div>
                <dt className="label">Format</dt>
                <dd>Digital PDF</dd>
              </div>
            </div>
          </div>

          {/* Cover Image with 3D effect */}
          <div className="magazine-hero__cover-wrapper">
            <a
              href={FLIPBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="magazine-cover"
              aria-label="Open The Trend magazine in a flip-book reader"
            >
              <img
                src="/trend.jpg"
                alt="The Trend Magazine 2026 Cover"
                className="magazine-cover__img"
              />
              <div className="magazine-cover__overlay">
                <span className="btn btn--primary">Open Flip-book</span>
              </div>
            </a>
            {/* Decorative background element */}
            <div className="magazine-hero__glow" aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* ============================================================
          EDITOR'S NOTE
      ============================================================ */}
      <section className="section section--surface">
        <div className="container">
          <div className="grid grid--golden magazine-note">
            <div>
              <span className="label">Editor's Note</span>
              <h2 className="magazine-note__title">
                More than just ink and images.
              </h2>
              <p className="magazine-note__text">
                "As you turn each page, we invite you to engage, reflect and
                connect with our work. Because beyond the ink and images, these
                stories are pieces of who we are."
              </p>
              <p className="magazine-note__author">
                — Skeeter Imisa, <span>Editor-in-Chief</span>
              </p>
            </div>
            <div className="magazine-note__stats">
              <ul>
                <li>
                  <span className="magazine-note__stat-num">70+</span>
                  <span className="label">Stories & Features</span>
                </li>
                <li>
                  <span className="magazine-note__stat-num">15</span>
                  <span className="label">Contributors</span>
                </li>
                <li>
                  <span className="magazine-note__stat-num">1</span>
                  <span className="label">Class of 2025</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DOWNLOAD BANNER (Bottom)
      ============================================================ */}
      <section className="section">
        <div className="container">
          <div className="magazine-banner">
            <div className="magazine-banner__content">
              <h3 className="magazine-banner__title">
                Prefer to read offline?
              </h3>
              <p className="magazine-banner__text">
                Download the full 76-page PDF to read on your phone, tablet, or
                print for your coffee table.
              </p>
            </div>
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <Icon name="download" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Magazine;
