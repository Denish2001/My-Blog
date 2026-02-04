import React from "react";
import "./CSS/About.css";

const About = () => {
  const classFeatures = [
    {
      title: "Media Innovation",
      description:
        "Exploring new frontiers in digital storytelling and communication",
    },
    {
      title: "Research Excellence",
      description: "Academic rigor combined with practical media applications",
    },
    {
      title: "Industry Connections",
      description: "Bridging academic learning with real-world media practice",
    },
    {
      title: "Digital First",
      description: "Mastering modern communication tools and platforms",
    },
  ];

  const classValues = [
    {
      title: "Integrity",
      description: "Ethical communication and responsible journalism",
    },
    {
      title: "Collaboration",
      description: "Teamwork across diverse media disciplines",
    },
    {
      title: "Innovation",
      description: "Creative approaches to media challenges",
    },
    {
      title: "Excellence",
      description: "Commitment to quality in all our work",
    },
  ];

  const courseModules = [
    {
      module: "Media Theory",
      focus: "Critical analysis of communication models",
    },
    {
      module: "Digital Journalism",
      focus: "Multimedia storytelling techniques",
    },
    {
      module: "Strategic Communication",
      focus: "PR, advertising and campaign planning",
    },
    {
      module: "Research Methods",
      focus: "Media analytics and audience research",
    },
  ];

  const Icon = ({ type }) => (
    <svg viewBox="0 0 24 24" className="icon">
      {type === "media" && (
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
      )}
      {type === "research" && (
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      )}
      {type === "innovation" && (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
      )}
      {type === "community" && (
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      )}
    </svg>
  );

  return (
    <div className="about-container">
      {/* Header */}
      <header className="about-header">
        <h1 className="about-title">KIMC Class of 2025</h1>
        <p className="about-subtitle">
          Postgraduate Diploma in Mass Communication
        </p>
        <p className="about-intro">
          This is the official Blog of KIMC's Postgraduate class of 2025 we are
          collective of aspiring media professionals shaping the future of
          communication in Kenya and beyond.
        </p>
      </header>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2 className="section-title">Our Purpose</h2>
          <p className="mission-statement">
            We are the next generation of media leaders, equipped with critical
            thinking, technical expertise, and ethical grounding to navigate the
            evolving media landscape.
          </p>
          <div className="mission-highlights">
            <div className="highlight">
              <Icon type="media" />
              <span>Professional Development</span>
            </div>
            <div className="highlight">
              <Icon type="research" />
              <span>Academic Excellence</span>
            </div>
            <div className="highlight">
              <Icon type="innovation" />
              <span>Digital Innovation</span>
            </div>
            <div className="highlight">
              <Icon type="community" />
              <span>Industry Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="course-section">
        <h2 className="section-title">Program Focus</h2>
        <p className="section-description">
          Comprehensive curriculum blending theory with practical application
        </p>

        <div className="modules-grid">
          {courseModules.map((module, index) => (
            <div key={index} className="module-card">
              <h3 className="module-name">{module.module}</h3>
              <p className="module-focus">{module.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <h2 className="section-title">What We Stand For</h2>
        <p className="section-description">
          The principles guiding our academic and professional journey
        </p>

        <div className="features-grid">
          {classFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <Icon
                  type={
                    index === 0
                      ? "innovation"
                      : index === 1
                        ? "research"
                        : index === 2
                          ? "community"
                          : "media"
                  }
                />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <h2 className="section-title">Our Values</h2>
        <div className="values-list">
          {classValues.map((value, index) => (
            <div key={index} className="value-item">
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join Our Network</h2>
          <p className="cta-description">
            Connect with future media leaders and industry partners
          </p>
          <div className="cta-actions">
            <a href="/contact" className="cta-button">
              Collaborate with Us
            </a>
            <a href="/blog" className="cta-button secondary">
              Read Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
