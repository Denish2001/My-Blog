import React from 'react';
import './CSS/About.css';

const About = () => {
  const features = [
    {
      title: 'Quality Content',
      description: 'We prioritize accuracy, depth, and engaging storytelling in every article we publish.'
    },
    {
      title: 'Timely Updates',
      description: 'Stay informed with our regularly updated content covering the latest trends and news.'
    },
    {
      title: 'In-Depth Analysis',
      description: 'Go beyond headlines with comprehensive research and expert insights.'
    },
    {
      title: 'Innovative Perspectives',
      description: 'Discover unique angles and fresh viewpoints on familiar topics.'
    }
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of journalistic integrity and ethical reporting.',
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and approaches to deliver better content experiences.',
    },
    {
      title: 'Community',
      description: 'We build and nurture a community of curious minds and engaged readers.',
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every piece of content we create and share.',
    }
  ];

  const milestones = [
    { year: '2020', event: 'The PGD Blog Founded', description: 'Started with a vision to deliver quality journalism' },
    { year: '2021', event: 'Reached 10,000 Monthly Readers', description: 'Growing community of engaged readers' },
    { year: '2022', event: 'Launched Mobile Experience', description: 'Optimized for readers on the go' },
    { year: '2023', event: 'Expanded to Multiple Content Categories', description: 'Diversified our storytelling approach' },
    { year: '2024', event: '1000+ Articles Published', description: 'Milestone of quality content creation' }
  ];

  // Custom SVG icons that match the journalism/blog theme
  const FeatureIcon = ({ index }) => (
    <div className="feature-icon-wrapper">
      <svg viewBox="0 0 24 24" className="feature-icon">
        {index === 0 && <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>}
        {index === 1 && <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8z"/>}
        {index === 2 && <path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"/>}
        {index === 3 && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>}
      </svg>
    </div>
  );

  const ValueIcon = ({ index }) => (
    <div className="value-icon-wrapper">
      <svg viewBox="0 0 24 24" className="value-icon">
        {index === 0 && <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>}
        {index === 1 && <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>}
        {index === 2 && <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>}
        {index === 3 && <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>}
      </svg>
    </div>
  );

  return (
    <div className="about-container">
      {/* Hero Section - Inspired by kumquat's clean aesthetic */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <div style={{ background:'#FFA6C9'}} className="about-hero-badge">Since 2020</div>
            <h1 className="about-hero-title">About The PGD Blog</h1>
            <p className="about-hero-subtitle">
              Your trusted source for insightful content, breaking news, and thought-provoking 
              perspectives. We're committed to delivering quality journalism that informs, 
              engages, and inspires our global community.
            </p>
            <div className="about-hero-stats">
              <div className="about-hero-stat">
                <span className="about-stat-number">1000+</span>
                <span className="about-stat-label">Articles Published</span>
              </div>
              <div className="about-hero-stat">
                <span className="about-stat-number">50K+</span>
                <span className="about-stat-label">Monthly Readers</span>
              </div>
              <div className="about-hero-stat">
                <span className="about-stat-number">10</span>
                <span className="about-stat-label">Expert Writers</span>
              </div>
              <div className="about-hero-stat">
                <span className="about-stat-number">12+</span>
                <span className="about-stat-label">Content Categories</span>
              </div>
            </div>
          </div>
          
          {/* Hero Visual - Clean, minimalist approach like kumquat */}
          <div className="about-hero-visual">
            <div className="about-visual-grid">
              <div style={{ background:'#A47DAB'}} className="about-grid-item about-grid-item-large">
                <div className="grid-item-content">
                  <span className="grid-item-title">Deep Analysis</span>
                  <span className="grid-item-subtitle">Beyond the headlines</span>
                </div>
              </div>
              <div style={{ background:'#FF7E70'}}className="about-grid-item">
                <div className="grid-item-content">
                  <span className="grid-item-title">Global Reach</span>
                </div>
              </div>
              <div style={{ background:'#80EF80'}} className="about-grid-item">
                <div className="grid-item-content">
                  <span className="grid-item-title">Expert Voices</span>
                </div>
              </div>
              <div style={{ background:'#FFA6C9'}}className="about-grid-item about-grid-item-wide">
                <div className="grid-item-content">
                  <span className="grid-item-title">Trusted Sources</span>
                  <span className="grid-item-subtitle">Verified information</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-content">
        {/* Mission Section - Clear affordances like DOET */}
        <section className="about-mission-section">
          <div className="about-section-container">
            <div className="about-section-header">
              <h2 className="about-section-title">Our Mission & Vision</h2>
              <p className="about-section-description">
                Driving meaningful conversations through quality journalism and innovative storytelling
              </p>
            </div>
            
            <div className="about-mission-content">
              <div className="about-mission-statement">
                <div className="mission-quote">
                  <svg viewBox="0 0 24 24" className="quote-icon">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                  <p className="about-mission-text">
                    To empower our readers with accurate, timely, and engaging content that 
                    helps them make informed decisions and stay ahead in an ever-changing world.
                  </p>
                </div>
              </div>
              
              <div className="about-mission-highlights">
                <div className="about-highlight-card">
                  <div className="about-highlight-graphic">
                    <div className="highlight-circle"></div>
                  </div>
                  <div className="about-highlight-content">
                    <h3 className="about-highlight-title">Accuracy First</h3>
                    <p className="about-highlight-description">Every fact verified, every source credible and trustworthy</p>
                  </div>
                </div>
                <div className="about-highlight-card">
                  <div className="about-highlight-graphic">
                    <div className="highlight-circle"></div>
                  </div>
                  <div className="about-highlight-content">
                    <h3 className="about-highlight-title">Reader-Focused</h3>
                    <p className="about-highlight-description">Content crafted with your interests and needs in mind</p>
                  </div>
                </div>
                <div className="about-highlight-card">
                  <div className="about-highlight-graphic">
                    <div className="highlight-circle"></div>
                  </div>
                  <div className="about-highlight-content">
                    <h3 className="about-highlight-title">Global Perspective</h3>
                    <p className="about-highlight-description">Diverse viewpoints and insights from around the world</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Clean grid like kumquat */}
        <section className="about-features-section">
          <div className="about-section-container">
            <div className="about-section-header">
              <h2 className="about-section-title">What Sets Us Apart</h2>
              <p className="about-section-description">
                We're not just another blog - we're a community of curious minds and passionate storytellers 
                dedicated to excellence in digital journalism.
              </p>
            </div>
            
            <div className="about-features-grid">
              {features.map((feature, index) => (
                <div key={index} className="about-feature-card">
                  <FeatureIcon index={index} />
                  <div className="about-feature-card-content">
                    <h3 className="about-feature-title">{feature.title}</h3>
                    <p className="about-feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section - Elegant presentation */}
        <section className="about-values-section">
          <div className="about-section-container">
            <div className="about-section-header">
              <h2 className="about-section-title">Our Core Values</h2>
              <p className="about-section-description">
                The fundamental principles that guide every decision we make and every story we tell
              </p>
            </div>
            
            <div className="about-values-grid">
              {values.map((value, index) => (
                <div key={index} className="about-value-card">
                  <ValueIcon index={index} />
                  <div className="about-value-content">
                    <h3 className="about-value-title">{value.title}</h3>
                    <p className="about-value-description">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section - Clear progression with better signifiers */}
        <section className="about-timeline-section">
          <div className="about-section-container">
            <div className="about-section-header">
              <h2 className="about-section-title">Our Journey</h2>
              <p className="about-section-description">
                From humble beginnings to becoming a trusted source for thousands of readers worldwide
              </p>
            </div>
            
            <div className="about-timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="about-timeline-item">
                  <div className="about-timeline-marker">
                    <div className="about-marker-dot"></div>
                    {index < milestones.length - 1 && <div className="about-timeline-connector"></div>}
                  </div>
                  <div className="about-timeline-content">
                    <div className="about-timeline-year">{milestone.year}</div>
                    <h3 className="about-timeline-event">{milestone.event}</h3>
                    <p className="about-timeline-description">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Clear affordances and constraints */}
        <section className="about-cta-section">
          <div className="about-cta-container">
            <div className="about-cta-content">
              <h2 className="about-cta-title">Join Our Growing Community</h2>
              <p className="about-cta-description">
                Be part of our journey and connect with thousands of readers who value 
                quality content and meaningful conversations.
              </p>
              <div className="about-cta-actions">
                <button className="about-btn-primary">
                  <svg viewBox="0 0 24 24" className="btn-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Start Reading Stories
                </button>
                <button className="about-btn-secondary">
                  <svg viewBox="0 0 24 24" className="btn-icon">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;