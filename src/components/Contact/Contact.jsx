import { useState, useId } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

/* ------------------------------------------------------------------
   Icons
------------------------------------------------------------------ */
const ICONS = {
  email:
    "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone:
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  location:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
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

/* ------------------------------------------------------------------
   Data
------------------------------------------------------------------ */
const CONTACT_METHODS = [
  {
    icon: "email",
    title: "Editorial",
    detail: "editor@pgdblog.com",
    description: "Story tips, corrections, submissions",
    href: "mailto:editor@pgdblog.com",
  },
  {
    icon: "email",
    title: "General",
    detail: "hello@pgdblog.com",
    description: "Everything else",
    href: "mailto:hello@pgdblog.com",
  },
  {
    icon: "phone",
    title: "Phone",
    detail: "+254 (0)20 600 1000",
    description: "Mon–Fri, 9:00–17:00 EAT",
    href: "tel:+254206001000",
  },
  {
    icon: "location",
    title: "Visit",
    detail: "Uholo Road, off Mombasa Road",
    description: "Nairobi, Kenya",
    href: "https://maps.google.com/?q=Kenya+Institute+of+Mass+Communication",
    external: true,
  },
];

const TOPICS = [
  "General inquiry",
  "Story tip",
  "Correction",
  "Collaboration",
  "Press / media",
];

const DEPARTMENTS = [
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

const FAQ = [
  {
    q: "How do I submit a story or pitch?",
    a: "Email editor@pgdblog.com with a one-paragraph pitch and any relevant links. We reply to every serious pitch within a week.",
  },
  {
    q: "Do you accept corrections?",
    a: "Yes. Email editor@pgdblog.com with the article URL and the specific correction. Verified corrections are published with a dated note.",
  },
  {
    q: "Can I republish your work?",
    a: "Most articles are available under a standard attribution license. Email hello@pgdblog.com with the article link and where it will appear.",
  },
  {
    q: "How do I join the team?",
    a: "The blog is run by KIMC's Postgraduate Mass Communication class of 2025. Openings, when they exist, are announced on the Team page.",
  },
];

/* ------------------------------------------------------------------
   Reusable field
------------------------------------------------------------------ */
const Field = ({ id, label, required, children, hint, error }) => (
  <div className="field">
    <label htmlFor={id} className="field__label">
      {label}
      {required && (
        <span className="field__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
    {children}
    {hint && !error && <p className="field__hint">{hint}</p>}
    {error && (
      <p className="field__error" role="alert">
        {error}
      </p>
    )}
  </div>
);

/* ------------------------------------------------------------------
   Page
------------------------------------------------------------------ */
const Contact = () => {
  const id = useId();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please add your name.";
    if (!form.email.trim()) next.email = "Please add your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "That email doesn't look quite right.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (form.message.trim().length < 10)
      next.message = "Please write at least a few words.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      // focus first error for accessibility
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setStatus(null);

    // No backend — simulate the request honestly.
    await new Promise((r) => setTimeout(r, 900));

    setIsSubmitting(false);
    setStatus("success");
    setForm({
      name: "",
      email: "",
      topic: TOPICS[0],
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact">
      {/* ============================================================
          HERO
      ============================================================ */}
      <header className="contact-hero">
        <div className="container">
          <span className="label">Contact</span>
          <h1 className="contact-hero__title">Talk to the newsroom.</h1>
          <p className="contact-hero__lede">
            Story tips, corrections, collaborations — or just say hello. Every
            message is read by a member of the team.
          </p>
        </div>
      </header>

      {/* ============================================================
          FORM + CONTACT METHODS
      ============================================================ */}
      <section className="section">
        <div className="grid grid--golden contact-main">
          {/* ---- Form ---- */}
          <div className="contact-form__wrap">
            <header className="section-header">
              <div className="section-header__row">
                <div>
                  <span className="label">Send a message</span>
                  <h2 className="section-header__title">We read every word</h2>
                </div>
              </div>
              <div className="section-header__line" />
            </header>

            {status === "success" ? (
              <div className="contact-success" role="status" aria-live="polite">
                <Icon name="check" className="contact-success__icon" />
                <div>
                  <h3 className="contact-success__title">Message received</h3>
                  <p className="contact-success__text">
                    We'll reply within two business days. If it's urgent, email{" "}
                    <a href="mailto:editor@pgdblog.com">editor@pgdblog.com</a>.
                  </p>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setStatus(null)}
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <Field
                    id={`${id}-name`}
                    label="Your name"
                    required
                    error={errors.name}
                  >
                    <input
                      id={`${id}-name`}
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className="input"
                    />
                  </Field>

                  <Field
                    id={`${id}-email`}
                    label="Email"
                    required
                    error={errors.email}
                  >
                    <input
                      id={`${id}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={update}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className="input"
                    />
                  </Field>
                </div>

                <Field id={`${id}-topic`} label="Topic">
                  <select
                    id={`${id}-topic`}
                    name="topic"
                    value={form.topic}
                    onChange={update}
                    className="input"
                  >
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field
                  id={`${id}-subject`}
                  label="Subject"
                  required
                  error={errors.subject}
                >
                  <input
                    id={`${id}-subject`}
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={update}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    className="input"
                  />
                </Field>

                <Field
                  id={`${id}-message`}
                  label="Message"
                  required
                  hint="A few sentences is enough."
                  error={errors.message}
                >
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={update}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className="input input--textarea"
                  />
                </Field>

                <div className="contact-form__actions">
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                    {!isSubmitting && <Icon name="arrow" />}
                  </button>
                  <p className="contact-form__note">
                    We never share your email.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ---- Contact methods ---- */}
          <aside
            className="contact-methods"
            aria-label="Other ways to reach us"
          >
            <span className="label">Direct</span>
            <h2 className="contact-methods__title">Or reach us directly</h2>
            <ul className="contact-methods__list">
              {CONTACT_METHODS.map((m) => (
                <li key={m.title}>
                  <a
                    href={m.href}
                    className="contact-method"
                    {...(m.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="contact-method__icon">
                      <Icon name={m.icon} />
                    </span>
                    <span className="contact-method__body">
                      <span className="contact-method__title">{m.title}</span>
                      <span className="contact-method__detail">{m.detail}</span>
                      <span className="contact-method__desc">
                        {m.description}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ============================================================
          DEPARTMENTS
      ============================================================ */}
      <section className="section section--surface">
        <div className="container">
          <header className="section-header">
            <div className="section-header__row">
              <div>
                <span className="label">Departments</span>
                <h2 className="section-header__title">Reach the right desk</h2>
              </div>
            </div>
            <div className="section-header__line" />
          </header>

          <ul className="grid grid--tiles contact-depts">
            {DEPARTMENTS.map((d) => (
              <li key={d.name} className="contact-dept">
                <h3 className="contact-dept__name">{d.name}</h3>
                <a href={`mailto:${d.email}`} className="contact-dept__link">
                  {d.email}
                </a>
                <a
                  href={`tel:${d.phone.replace(/\D/g, "")}`}
                  className="contact-dept__link"
                >
                  {d.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          FAQ
      ============================================================ */}
      <section className="section">
        <div className="grid grid--golden contact-faq">
          <div>
            <span className="label">FAQ</span>
            <h2 className="contact-faq__title">Questions we're asked a lot</h2>
            <p className="contact-faq__text">
              If your answer isn't here, the form above is the fastest way to
              reach us.
            </p>
          </div>
          <div className="contact-faq__list">
            {FAQ.map((item) => (
              <details key={item.q} className="faq">
                <summary className="faq__summary">
                  <span>{item.q}</span>
                  <span className="faq__chevron" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="faq__body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider divider--accent" />
      </div>
    </div>
  );
};

export default Contact;
