import { useState } from "react";
import { Link } from "react-router-dom";
import "./Team.css";

/* ================================================================
   ICONS
================================================================ */
const ICONS = {
  editor:
    "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  tech: "M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z",
  lifestyle:
    "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  reporter:
    "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z",
  creative:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z",
  arrow: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
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
   DATA
================================================================ */
const TEAM = [
  {
    id: 1,
    name: "Denish Awajo",
    role: "Contributor & Dev",
    email: "awajodenish@gmail.com",
    bio: "Editor, digital publisher and storyteller interested in the intersection of journalism, technology and design.",
    specialties: [
      "Editorial Leadership",
      "Content Strategy",
      "Digital Publishing",
    ],
    image: "/team/denish.jpg",
    linkedin: "https://linkedin.com/in/denish-awajo/",
    icon: "editor",
  },
  {
    id: 2,
    name: "Patrick Mugure",
    role: "Contributor",
    email: "patrick@pgd.com",
    bio: "Supports the editorial process with a focus on clear, engaging stories and editorial quality.",
    specialties: ["Feature Writing", "Copy Editing", "Research"],
    image: "/team/mugure.jpg",
    icon: "editor",
  },
  {
    id: 3,
    name: "Ejidio Maina",
    role: "Contributor",
    email: "ejidio@pgd.com",
    bio: "Covers technology, digital innovation and the ways emerging tools shape everyday life.",
    specialties: [
      "Technology Reporting",
      "Digital Innovation",
      "Science & Tech",
    ],
    image: "/team/ejidio.jpg",
    icon: "tech",
  },
  {
    id: 4,
    name: "George Mwangi",
    role: "Contributor",
    email: "george@pgd.com",
    bio: "Develops lifestyle-focused coverage exploring wellness, health and everyday experiences.",
    specialties: ["Lifestyle", "Wellness", "Human-Interest"],
    image: "/team/george.jpeg",
    icon: "lifestyle",
  },
  {
    id: 5,
    name: "Vyonnah Nyambura",
    role: "Contributor",
    email: "vyonnah@pgd.com",
    bio: "Contributes to news gathering, interviews and reporting with an emphasis on clear, accurate storytelling.",
    specialties: ["News Reporting", "Interviews", "News Gathering"],
    image: "/team/vyona.jpeg",
    icon: "reporter",
  },
  {
    id: 6,
    name: "Skeeter Imisa",
    role: "Contributor",
    email: "skeeter@pgd.com",
    bio: "Journalist and television producer/director working across documentary, interviews and live productions — with a focus on disability reporting and inclusive representation.",
    specialties: ["Broadcast", "Documentary", "Inclusion"],
    image: "/team/skeeter.jpg",
    linkedin: "https://ke.linkedin.com/in/skeeterimisa",
    icon: "reporter",
  },
  {
    id: 7,
    name: "Bridgette Muthoni",
    role: "Contributor",
    email: "bridgette@pgd.com",
    bio: "Contributes to the visual direction of the publication, shaping how stories are presented through design and imagery.",
    specialties: [
      "Visual Communication",
      "Creative Direction",
      "Editorial Design",
    ],
    image: "/team/muthoni.jpeg",
    icon: "creative",
  },
  {
    id: 8,
    name: "Ronny Choge",
    role: "Contributor",
    email: "ronny@pgd.com",
    bio: "A writer whose work explores Kenyan public affairs, politics, culture and community issues.",
    specialties: ["Public Affairs", "Political Commentary", "Culture"],
    image: "/team/choge.jpg",
    icon: "reporter",
  },
];

/* ================================================================
   MEMBER CARD
================================================================ */
const MemberCard = ({ member, index }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="member" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="member__portrait">
        {!imgFailed && member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="member__photo"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="member__fallback" aria-hidden="true">
            <Icon name={member.icon} />
          </div>
        )}

        <span className="member__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="member__body">
        <div className="member__role">
          <Icon name={member.icon} className="member__role-icon" />
          <span>{member.role}</span>
        </div>

        <h3 className="member__name">{member.name}</h3>
        <p className="member__bio">{member.bio}</p>

        <ul className="member__specialties" aria-label="Specialties">
          {member.specialties.map((s) => (
            <li key={s} className="member__tag">
              {s}
            </li>
          ))}
        </ul>

        <div className="member__actions">
          <Link
            to={`/AllStories?author=${encodeURIComponent(member.name)}`}
            className="member__link member__link--primary"
          >
            Read stories
            <Icon name="arrow" className="icon--sm" />
          </Link>
          <a
            href={`mailto:${member.email}`}
            className="member__link"
            aria-label={`Email ${member.name}`}
          >
            Email
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="member__link"
              aria-label={`${member.name} on LinkedIn`}
            >
              LinkedIn
              <Icon name="arrow" className="icon--sm" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/* ================================================================
   PAGE
================================================================ */
const Team = () => {
  return (
    <div className="team">
      {/* ============================================================
          HERO
      ============================================================ */}
      <header className="team-hero">
        <div className="container">
          <span className="label team-hero__label">The Masthead</span>
          <h1 className="team-hero__title">
            The people behind{" "}
            <span className="team-hero__accent">the PGD Blog</span>
          </h1>
          <p className="team-hero__lede">
            Nine postgraduate journalists, editors and storytellers from KIMC's
            class of 2025 — building a publication in public.
          </p>

          <dl className="team-hero__stats">
            <div>
              <dt className="label">Members</dt>
              <dd>08</dd>
            </div>
            <div>
              <dt className="label">Categories</dt>
              <dd>12</dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd>Nairobi</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ============================================================
          MEMBERS
      ============================================================ */}
      <section className="section team-roster">
        <div className="grid grid--cards team-roster__grid">
          {TEAM.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA
      ============================================================ */}
    </div>
  );
};

export default Team;
