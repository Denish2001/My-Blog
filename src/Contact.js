import React, { useState } from "react";
import "./CSS/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  // KIMC Contact Information
  const contactInfo = [
    {
      title: "General Inquiries",
      detail: "info@kimc.ac.ke",
      description: "Main communication channel for all queries",
      action: "mailto:info@kimc.ac.ke",
    },
    {
      title: "Admissions Office",
      detail: "admissions@kimc.ac.ke",
      description: "Course information and application process",
      action: "mailto:admissions@kimc.ac.ke",
    },
    {
      title: "Campus Location",
      detail: "Uholo Road, Off Mombasa Road",
      description: "Nairobi, Kenya",
      action:
        "https://maps.google.com/?q=Kenya+Institute+of+Mass+Communication",
    },
    {
      title: "Telephone",
      detail: "+254 (0)20 600 1000",
      description: "Monday to Friday, 8:00 AM to 5:00 PM",
      action: "tel:+2540206001000",
    },
  ];

  const departments = [
    {
      name: "Journalism & Media Studies",
      email: "journalism@kimc.ac.ke",
      phone: "+254 (0)20 600 1001",
    },
    {
      name: "Film & Television Production",
      email: "film@kimc.ac.ke",
      phone: "+254 (0)20 600 1002",
    },
    {
      name: "Public Relations",
      email: "pr@kimc.ac.ke",
      phone: "+254 (0)20 600 1003",
    },
    {
      name: "Library Services",
      email: "library@kimc.ac.ke",
      phone: "+254 (0)20 600 1004",
    },
  ];

  const faqItems = [
    {
      question: "What are the admission requirements for KIMC?",
      answer:
        "Minimum requirements include KCSE C+ with relevant subject passes. Specific courses may have additional requirements.",
    },
    {
      question: "Does KIMC offer accommodation for students?",
      answer:
        "Yes, we have limited hostel facilities. Priority is given to students from outside Nairobi County.",
    },
    {
      question: "Are there evening or weekend classes?",
      answer:
        "Currently, most programs are offered during regular working hours. Please check specific course schedules.",
    },
    {
      question: "Can international students apply?",
      answer:
        "Yes, KIMC welcomes international students. Additional documentation may be required.",
    },
  ];

  // Simple icon component
  const ContactIcon = ({ type }) => (
    <svg viewBox="0 0 24 24" className="contact-icon">
      {type === "email" && (
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      )}
      {type === "phone" && (
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      )}
      {type === "location" && (
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      )}
      {type === "department" && (
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
      )}
    </svg>
  );

  return (
    <div className="contact-container">
      {/* Header Section */}
      <header className="contact-header">
        <h1 className="contact-title">Contact KIMC</h1>
        <p className="contact-subtitle">
          Kenya Institute of Mass Communication - Center for Media Excellence
        </p>
      </header>

      {/* Main Contact Information */}
      <div className="contact-main-grid">
        {/* Contact Form */}
        <div className="contact-form-section">
          <h2 className="section-title">Send a Message</h2>
          <p className="section-description">
            For inquiries about courses, admissions, or general information
          </p>

          {submitStatus === "success" && (
            <div className="success-message">
              <ContactIcon type="email" />
              <div className="success-content">
                <h3>Message Sent</h3>
                <p>We'll respond within 2 business days</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Your Message"
                className="form-textarea"
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="contact-info-section">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-description">
            Direct contacts for different purposes
          </p>

          <div className="contact-methods">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                className="contact-method"
                target={info.title === "Campus Location" ? "_blank" : "_self"}
                rel="noreferrer"
              >
                <ContactIcon
                  type={
                    info.title.includes("Email")
                      ? "email"
                      : info.title.includes("Telephone")
                        ? "phone"
                        : info.title.includes("Location")
                          ? "location"
                          : "department"
                  }
                />
                <div className="method-content">
                  <h3>{info.title}</h3>
                  <p className="method-detail">{info.detail}</p>
                  <p className="method-description">{info.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Department Contacts */}
      <div className="departments-section">
        <h2 className="section-title">Department Contacts</h2>
        <p className="section-description">
          Specific contacts for different academic departments
        </p>

        <div className="departments-grid">
          {departments.map((dept, index) => (
            <div key={index} className="department-card">
              <ContactIcon type="department" />
              <h3 className="department-name">{dept.name}</h3>
              <div className="department-contacts">
                <a href={`mailto:${dept.email}`} className="department-link">
                  {dept.email}
                </a>
                <a
                  href={`tel:${dept.phone.replace(/\D/g, "")}`}
                  className="department-link"
                >
                  {dept.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="section-title">Common Questions</h2>
        <p className="section-description">
          Quick answers to frequently asked questions
        </p>

        <div className="faq-list">
          {faqItems.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">{faq.question}</summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h2 className="section-title">Visit Our Campus</h2>
        <div className="map-container">
          {/* Simple map placeholder - in production, embed Google Maps */}
          <div className="map-placeholder">
            <ContactIcon type="location" />
            <p>Uholo Road, Off Mombasa Road</p>
            <p>Nairobi, Kenya</p>
            <a
              href="https://maps.google.com/?q=Kenya+Institute+of+Mass+Communication"
              className="directions-link"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
