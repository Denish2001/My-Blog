import React from 'react';
import './CSS/Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Denish Awajo",
      role: "Editor-in-Chief",
      email: "denish@pgd.com",
      specialties: ["Content Strategy", "Editing", "Leadership"],
      image: "/Denish.jpg" // Add image path
    },
    {
      id: 8,
      name: "Nicholas Waite",
      role: "Managing Editor",
      email: "nicholas@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/waite.jpeg"
    },
    {
      id: 2,
      name: "Patrick Mugure",
      role: "Senior Editor",
      email: "patrick@pgd.com",
      specialties: ["Feature Writing", "Editing", "Research"],
      image: "/mugure.jpg"
    },
    {
      id: 3,
      name: "Ejidio Maina",
      role: "Technology Correspondent",
      email: "ejidio@pgd.com",
      specialties: ["Technology", "Software", "Innovation"],
      image: "/images/team/ejidio-maina.jpg"
    },
    {
      id: 4,
      name: "George Mwangi",
      role: "Lifestyle Editor",
      email: "george@pgd.com",
      specialties: ["Lifestyle", "Wellness", "Health"],
      image: "/george.jpeg"
    },
    {
      id: 5,
      name: "Vyonnah Nyambura",
      role: "News Reporter",
      email: "vyonnah@pgd.com",
      specialties: ["Breaking News", "Reporting", "Interviews"],
      image: "/images/team/vyonnah-nyambura.jpg"
    },
    {
      id: 6,
      name: "Skeeter Imisa",
      role: "Creative Director",
      email: "skeeter@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/skeeter.jpg"
    },
    {
      id: 7,
      name: "Bridgette Muthoni",
      role: "Creative Director",
      email: "bridgette@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/muthoni.jpeg"
    },
    {
      id: 9,
      name: "Ronny Choge",
      role: "News Reporter",
      email: "ronny@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/choge.jpg"
    },
    {
      id: 10,
      name: "Sylvia Menya",
      role: "News Reporter",
      email: "sylvia@pgd.com",
      specialties: ["Design", "Visual Content", "Branding"],
      image: "/images/team/sylvia-menya.jpg"
    }
  ];

  // Custom SVG icons for different roles
  const RoleIcon = ({ role }) => (
    <div className="role-icon-wrapper">
      <svg viewBox="0 0 24 24" className="role-icon">
        {role.includes('Editor') && <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>}
        {role.includes('Technology') && <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"/>}
        {role.includes('Lifestyle') && <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>}
        {role.includes('Reporter') && <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>}
        {role.includes('Creative') && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>}
      </svg>
    </div>
  );

  const StatIcon = ({ index }) => (
    <div className="stat-icon-wrapper">
      <svg viewBox="0 0 24 24" className="stat-icon">
        {index === 0 && <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>}
        {index === 1 && <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>}
        {index === 2 && <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>}
        {index === 3 && <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>}
      </svg>
    </div>
  );

  return (
    <div className="team-container">
      {/* Main Content */}
      <div className="team-content">
        {/* Team Grid Section */}
        <section className="team-grid-section">
          <div className="section-header">
            <h2 className="section-title">Our Editorial Experts</h2>
            <p className="section-description">
              Each team member brings unique expertise and perspective to deliver compelling stories
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <article key={member.id} className="team-card">
                <div className="team-card-header">
                  <div className="member-avatar">
                    <div className="avatar-image-container">
                      {/* Team member image with fallback to placeholder */}
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="member-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="avatar-placeholder">
                        <RoleIcon role={member.role} />
                      </div>
                    </div>
                    <div className="avatar-overlay">
                      <span className="view-profile-text">View Profile</span>
                    </div>
                  </div>
                  <div className="member-basic-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <div className="member-contact">
                      <a 
                        href={`mailto:${member.email}`}
                        className="email-link"
                        aria-label={`Email ${member.name}`}
                      >
                        <svg viewBox="0 0 24 24" className="email-icon">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="team-card-body">
                  <div className="specialties-section">
                    <h4 className="specialties-title">Areas of Expertise</h4>
                    <div className="specialties-grid">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="team-card-footer">
                  <button className="contact-btn">
                    <svg viewBox="0 0 24 24" className="contact-btn-icon">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span className="contact-btn-text">Contact {member.name.split(' ')[0]}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="team-stats-section">
          <div className="section-header">
            <h2 className="section-title">Our Impact in Numbers</h2>
            <p className="section-description">
              Measuring our commitment to quality journalism and reader engagement
            </p>
          </div>

          <div className="stats-grid">
            {[
              { number: "10", label: "Dedicated Team Members" },
              { number: "50+", label: "Years Combined Experience" },
              { number: "1000+", label: "Articles Published" },
              { number: "12+", label: "Content Categories Covered" }
            ].map((stat, index) => (
              <div key={index} className="stat-card">
                <StatIcon index={index} />
                <div className="stat-content">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="team-cta">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Journey</h2>
            <p className="cta-description">
              Interested in collaborating or have a story idea? We'd love to hear from you.
            </p>
            <div className="cta-actions">
              <button className="btn-primary">
                <svg viewBox="0 0 24 24" className="btn-icon">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Contact Our Team
              </button>
              <button className="btn-secondary">
                <svg viewBox="0 0 24 24" className="btn-icon">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Explore Open Roles
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;