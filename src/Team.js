import React from "react";
import "./CSS/Team.css";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Denish Awajo",
      role: "Editor-in-Chief",
      email: "denish@pgd.com",
      specialties: ["Content Strategy", "Editing", "Leadership"],
      image: "/Denish.jpg", // Add image path
    },
    {
      id: 6,
      name: "Skeeter Imisa",
      role: "Creative Director",
      email: "skeeter@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/skeeter.jpg",
    },

    {
      id: 2,
      name: "Patrick Mugure",
      role: "Senior Editor",
      email: "patrick@pgd.com",
      specialties: ["Feature Writing", "Editing", "Research"],
      image: "/mugure.jpg",
    },
    {
      id: 3,
      name: "Ejidio Maina",
      role: "Technology Correspondent",
      email: "ejidio@pgd.com",
      specialties: ["Technology", "Software", "Innovation"],
      image: "/images/team/ejidio-maina.jpg",
    },
    {
      id: 4,
      name: "George Mwangi",
      role: "Lifestyle Editor",
      email: "george@pgd.com",
      specialties: ["Lifestyle", "Wellness", "Health"],
      image: "/george.jpeg",
    },
    {
      id: 5,
      name: "Vyonnah Nyambura",
      role: "News Reporter",
      email: "vyonnah@pgd.com",
      specialties: ["Breaking News", "Reporting", "Interviews"],
      image: "/images/team/vyonnah-nyambura.jpg",
    },

    {
      id: 7,
      name: "Bridgette Muthoni",
      role: "Creative Director",
      email: "bridgette@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/muthoni.jpeg",
    },
    {
      id: 9,
      name: "Ronny Choge",
      role: "News Reporter",
      email: "ronny@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/choge.jpg",
    },
    {
      id: 10,
      name: "Sylvia Menya",
      role: "News Reporter",
      email: "sylvia@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/images/team/sylvia-menya.jpg",
    },
  ];

  // Simplified icon system
  const RoleIcon = ({ role }) => {
    const getIconPath = () => {
      if (role.includes("Editor"))
        return "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z";
      if (role.includes("Technology"))
        return "M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z";
      if (role.includes("Lifestyle"))
        return "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z";
      if (role.includes("Reporter") || role.includes("Correspondent"))
        return "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z";
      if (role.includes("Creative"))
        return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z";
      return "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
    };

    return (
      <svg viewBox="0 0 24 24" className="role-icon">
        <path d={getIconPath()} />
      </svg>
    );
  };

  return (
    <div className="team-container">
      {/* Header Section - Minimal & Clear */}
      <header className="team-header">
        <h1 className="team-title">Our Team</h1>
        <p className="team-subtitle">
          Expert journalists and editors dedicated to quality storytelling
        </p>
      </header>

      {/* Team Grid - Focused on Essential Information */}
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            {/* Avatar - Simple & Functional */}
            <div className="member-avatar">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                  loading="lazy"
                />
              ) : (
                <div className="avatar-placeholder">
                  <RoleIcon role={member.role} />
                </div>
              )}
            </div>

            {/* Core Information - Clean Hierarchy */}
            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <div className="member-role-container">
                <RoleIcon role={member.role} />
                <span className="member-role">{member.role}</span>
              </div>
            </div>

            {/* Specialties - Minimal Tags */}
            <div className="member-specialties">
              {member.specialties.slice(0, 2).map((specialty, index) => (
                <span key={index} className="specialty-tag">
                  {specialty}
                </span>
              ))}
              {member.specialties.length > 2 && (
                <span className="specialty-tag">
                  +{member.specialties.length - 2}
                </span>
              )}
            </div>

            {/* Contact - Discrete & Accessible */}
            <div className="member-contact">
              <a
                href={`mailto:${member.email}`}
                className="email-link"
                title={`Email ${member.name}`}
              >
                Contact
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Stats - Minimal & Meaningful */}
      <div className="team-stats">
        <div className="stat-item">
          <div className="stat-number">10</div>
          <div className="stat-label">Team Members</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Articles</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">12+</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Single CTA - Clear & Purposeful */}
      <div className="team-cta">
        <h2 className="cta-title">Work with us</h2>
        <p className="cta-description">
          Have a story idea or want to collaborate? Get in touch.
        </p>
        <div className="cta-actions">
          <a href="mailto:team@pgd.com" className="cta-button">
            Contact Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
