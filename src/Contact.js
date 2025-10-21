import React, { useState } from 'react';
import './CSS/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      title: 'Email Us',
      detail: 'hello@pgdblog.com',
      description: 'Send us an email anytime, we respond within 24 hours'
    },
    {
      title: 'Call Us',
      detail: '+1 (555) 123-4567',
      description: 'Monday to Friday, 9:00 AM to 6:00 PM EST'
    },
    {
      title: 'Visit Our Office',
      detail: '123 Blog Street, Digital City',
      description: 'Feel free to visit our headquarters'
    },
    {
      title: 'Live Chat Support',
      detail: 'Available 24/7',
      description: 'Instant support for urgent inquiries'
    }
  ];

  const faqItems = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. Urgent matters are prioritized.'
    },
    {
      question: 'Can I submit a guest post or story idea?',
      answer: 'Absolutely! We welcome guest contributions. Please use "Guest Post Submission" in the subject line and include your writing samples.'
    },
    {
      question: 'Do you offer advertising or partnership opportunities?',
      answer: 'Yes! We offer various advertising options and partnership programs. Contact us with "Partnership Inquiry" for detailed information.'
    },
    {
      question: 'How can I report technical issues or content concerns?',
      answer: 'For technical issues, use "Technical Support" in the subject. For content concerns, please specify "Content Review" with details.'
    }
  ];

  // Custom SVG icons for contact methods
  const ContactIcon = ({ index }) => (
    <div className="contact-icon-wrapper">
      <svg viewBox="0 0 24 24" className="contact-icon">
        {index === 0 && <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>}
        {index === 1 && <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>}
        {index === 2 && <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>}
        {index === 3 && <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>}
      </svg>
    </div>
  );

  const SocialIcon = ({ platform }) => (
    <svg viewBox="0 0 24 24" className="social-icon">
      {platform === 'twitter' && <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>}
      {platform === 'facebook' && <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>}
      {platform === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>}
      {platform === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
    </svg>
  );

  return (
    <div className="contact-container">
      {/* Hero Section - Clean minimalist design */}
      
      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-layout">
          {/* Contact Information Section */}
          <section className="contact-info-section">
            <div className="contact-section-header">
              <h2 className="contact-section-title">Contact Information</h2>
              <p className="contact-section-description">
                Multiple ways to reach us. Choose the method that works best for your needs.
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-card">
                  <ContactIcon index={index} />
                  <div className="contact-info-content">
                    <h3 className="contact-info-title">{info.title}</h3>
                    <p className="contact-info-detail">{info.detail}</p>
                    <p className="contact-info-description">{info.description}</p>
                    <button className="contact-info-action-btn">
                      {info.title.includes('Email') ? 'Send Email' : 
                       info.title.includes('Call') ? 'Call Now' :
                       info.title.includes('Visit') ? 'Get Directions' : 'Start Chat'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-social-section">
              <h3 className="contact-social-title">Follow Our Journey</h3>
              <p className="contact-social-description">
                Stay updated with our latest stories and behind-the-scenes content
              </p>
              <div className="contact-social-links-grid">
                <a href="#" className="contact-social-links">
                  <SocialIcon platform="twitter" />
                  <span className="contact-social-platform">Twitter</span>
                </a>
                <a href="#" className="contact-social-links">
                  <SocialIcon platform="facebook" />
                  <span className="contact-social-platform">Facebook</span>
                </a>
                <a href="#" className="contact-social-links">
                  <SocialIcon platform="instagram" />
                  <span className="contact-social-platform">Instagram</span>
                </a>
                <a href="#" className="contact-social-links">
                  <SocialIcon platform="linkedin" />
                  <span className="contact-social-platform">LinkedIn</span>
                </a>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="contact-form-section">
            <div className="contact-form-container">
              <div className="contact-form-header">
                <h2 className="contact-form-title">Send Us a Message</h2>
                <p className="contact-form-description">
                  Have a question, suggestion, or story idea? We'd love to hear from you. 
                  Fill out the form below and we'll get back to you promptly.
                </p>
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="contact-success-message">
                  <div className="contact-success-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="contact-success-content">
                    <h3 className="contact-success-title">Message Sent Successfully!</h3>
                    <p className="contact-success-description">
                      Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-grid">
                  <div className="contact-form-group">
                    <label htmlFor="contact-name" className="contact-form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="contact-form-group">
                    <label htmlFor="contact-email" className="contact-form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="contact-form-group contact-full-width">
                    <label htmlFor="contact-subject" className="contact-form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="contact-form-input"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="contact-form-group contact-full-width">
                    <label htmlFor="contact-message" className="contact-form-label">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="contact-form-textarea"
                      placeholder="Tell us how we can help you or share your story idea..."
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'contact-submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="contact-btn-spinner"></div>
                      <span className="contact-btn-text">Sending Your Message...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="contact-btn-icon">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                      <span className="contact-btn-text">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="contact-faq-section">
          <div className="contact-section-header">
            <h2 className="contact-section-title">Frequently Asked Questions</h2>
            <p className="contact-section-description">
              Quick answers to common questions about contacting us and our processes
            </p>
          </div>

          <div className="contact-faq-grid">
            {faqItems.map((faq, index) => (
              <div key={index} className="contact-faq-card">
                <div className="contact-faq-header">
                  <h3 className="contact-faq-question">{faq.question}</h3>
                  <span className="contact-faq-toggle">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </span>
                </div>
                <div className="contact-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;