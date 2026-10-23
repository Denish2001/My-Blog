import { Link } from "react-router-dom";
import "./About.css";

/* ------------------------------------------------------------------
   Icons — one map, one component
------------------------------------------------------------------ */
const ICONS = {
  media:
    "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z",
  research:
    "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  innovation:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z",
  community:
    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  arrow: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  clock:
    "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  cap: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
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

/* ------------------------------------------------------------------
   Content — data separated from markup
------------------------------------------------------------------ */
const HIGHLIGHTS = [
  { icon: "media", label: "Professional Development" },
  { icon: "research", label: "Academic Excellence" },
  { icon: "innovation", label: "Digital Innovation" },
  { icon: "community", label: "Industry Impact" },
];

const MODULES = [
  {
    module: "Media Theory",
    focus: "Critical analysis of communication models",
  },
  { module: "Digital Journalism", focus: "Multimedia storytelling techniques" },
  {
    module: "Strategic Communication",
    focus: "PR, advertising and campaign planning",
  },
  {
    module: "Research Methods",
    focus: "Media analytics and audience research",
  },
];

const FEATURES = [
  {
    icon: "innovation",
    title: "Media Innovation",
    description:
      "Exploring new frontiers in digital storytelling and communication.",
  },
  {
    icon: "research",
    title: "Research Excellence",
    description: "Academic rigor combined with practical media applications.",
  },
  {
    icon: "community",
    title: "Industry Connections",
    description: "Bridging academic learning with real-world media practice.",
  },
  {
    icon: "media",
    title: "Digital First",
    description: "Mastering modern communication tools and platforms.",
  },
];

const VALUES = [
  {
    number: "01",
    title: "Integrity",
    description: "Ethical communication and responsible journalism.",
  },
  {
    number: "02",
    title: "Collaboration",
    description: "Teamwork across diverse media disciplines.",
  },
  {
    number: "03",
    title: "Innovation",
    description: "Creative approaches to media challenges.",
  },
  {
    number: "04",
    title: "Excellence",
    description: "Commitment to quality in all our work.",
  },
];

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------ */
const About = () => {
  return (
    <div className="about">
      {/* ============================================================
          HERO — Group photo with dark scrim
      ============================================================ */}
      <section className="about-hero">
        <div className="about-hero__media" aria-hidden="true">
          <img src="/pgd.jpg" alt="" loading="eager" className="img-cover" />
          <div className="about-hero__scrim" />
        </div>

        <div className="container about-hero__content">
          <span className="label about-hero__label">About the class</span>
          <h1 className="about-hero__title">
            The KIMC Postgraduate
            <br />
            Class of 2025
          </h1>
          <p className="about-hero__lede">
            A collective of aspiring media professionals shaping the future of
            communication in Kenya and beyond.
          </p>
        </div>
      </section>

      {/* ============================================================
          PROGRAM DETAILS (New factual section)
      ============================================================ */}
      <section className="section section--surface">
        <div className="container">
          <div className="grid grid--golden about-program-details">
            <div className="about-program-details__content">
              <span className="label text-accent">The Program</span>
              <h2 className="about-program-details__title">
                Postgraduate Diploma in Mass Communication
              </h2>
              <p className="about-program-details__text">
                Offered under the Postgraduate Training and Research Department
                at KIMC, this intensive program is tailored for university
                graduates from non-media backgrounds looking to pivot into
                journalism, broadcasting, or corporate communication.
              </p>

              <ul className="about-program-details__list">
                <li>
                  <Icon name="clock" className="about-program-details__icon" />
                  <div>
                    <h4>Duration & Study Modes</h4>
                    <p>
                      1 Year. Flexible schedules available: Regular (Mon–Fri,
                      8:30 AM – 4:00 PM) or Evening (Mon–Fri, 4:30 PM – 8:30 PM
                      & Sat, 8:00 AM – 5:00 PM).
                    </p>
                  </div>
                </li>
                <li>
                  <Icon name="cap" className="about-program-details__icon" />
                  <div>
                    <h4>Admission Requirements</h4>
                    <p>
                      Applicants must hold any Bachelor’s Degree from a
                      university recognized by the Commission for University
                      Education (CUE). Your undergraduate degree does not need
                      to be in media.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Program Stats Card (Dark background, white text) */}
            <div className="about-program-details__card">
              <h3 className="about-program-details__card-title">At a Glance</h3>
              <div className="about-program-details__card-item">
                <span className="about-program-details__card-num">1</span>
                <span className="label">Year to Complete</span>
              </div>
              <div className="about-program-details__card-item">
                <span className="about-program-details__card-num">2</span>
                <span className="label">Study Modes</span>
              </div>
              <div className="about-program-details__card-item">
                <span className="about-program-details__card-num">Any</span>
                <span className="label">Bachelor's Degree Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PURPOSE
      ============================================================ */}
      <section className="section">
        <div className="grid grid--golden about-purpose">
          <div>
            <span className="label">Our purpose</span>
            <h2 className="about-purpose__title">
              The next generation of media leaders.
            </h2>
          </div>
          <div>
            <p className="about-purpose__text">
              We are equipped with critical thinking, technical expertise, and
              ethical grounding to navigate the evolving media landscape — in
              Kenya and across the world.
            </p>
            <ul className="about-highlights">
              {HIGHLIGHTS.map((h) => (
                <li key={h.label} className="about-highlights__item">
                  <Icon name={h.icon} />
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROGRAM FOCUS (numbered modules)
      ============================================================ */}
      <section className="section section--surface about-program">
        <div className="container">
          <header className="section-header">
            <div className="section-header__row">
              <div>
                <span className="label">Curriculum</span>
                <h2 className="section-header__title">Program focus</h2>
              </div>
            </div>
            <div className="section-header__line" />
          </header>

          <ol className="about-modules">
            {MODULES.map((m, i) => (
              <li key={m.module} className="about-modules__item">
                <span className="about-modules__number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="about-modules__body">
                  <h3 className="about-modules__name">{m.module}</h3>
                  <p className="about-modules__focus">{m.focus}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
          FEATURES
      ============================================================ */}
      <section className="section">
        <header className="section-header">
          <div className="section-header__row">
            <div>
              <span className="label">What we stand for</span>
              <h2 className="section-header__title">
                Principles guiding our journey
              </h2>
            </div>
          </div>
          <div className="section-header__line" />
        </header>

        <div className="grid grid--cards about-features">
          {FEATURES.map((f) => (
            <article key={f.title} className="about-feature">
              <div className="about-feature__icon">
                <Icon name={f.icon} />
              </div>
              <h3 className="about-feature__title">{f.title}</h3>
              <p className="about-feature__text">{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          VALUES (numbered)
      ============================================================ */}
      <section className="section about-values">
        <header className="section-header">
          <div className="section-header__row">
            <div>
              <span className="label">Our values</span>
              <h2 className="section-header__title">What anchors us</h2>
            </div>
          </div>
          <div className="section-header__line" />
        </header>

        <ol className="about-values__list">
          {VALUES.map((v) => (
            <li key={v.title} className="about-values__item">
              <span className="about-values__number">{v.number}</span>
              <h3 className="about-values__title">{v.title}</h3>
              <p className="about-values__text">{v.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============================================================
          CTA
      ============================================================ */}
      <section className="section about-cta">
        <div className="about-cta__inner">
          <div className="about-cta__content">
            <span className="label about-cta__label">Get involved</span>
            <h2 className="about-cta__title">Join our network</h2>
            <p className="about-cta__text">
              Connect with future media leaders and industry partners.
            </p>
          </div>
          <div className="about-cta__actions">
            <Link to="/Contact" className="btn btn--primary">
              <span>Collaborate with us</span>
              <Icon name="arrow" />
            </Link>
            <Link to="/AllStories" className="btn btn--ghost">
              <span>Read our work</span>
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
