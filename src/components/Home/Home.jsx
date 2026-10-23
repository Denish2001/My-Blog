import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import db from '../../server/db.json';
import './Home.css';

/* ------------------------------------------------------------------
   Utilities
------------------------------------------------------------------ */
const stripHtml = (html = '') =>
  html
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim();

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / 86_400_000);

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/* ------------------------------------------------------------------
   Icons
------------------------------------------------------------------ */
const ICONS = {
  story:
    'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  arrow: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  magazine:
    'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
};

const Icon = ({ type = 'arrow', className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    className={`icon ${className}`.trim()}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={ICONS[type]} />
  </svg>
);

/* ------------------------------------------------------------------
   Data
------------------------------------------------------------------ */
const CATEGORY_COLORS = [
  '#0066CC',
  '#00A86B',
  '#FF6B35',
  '#9B59B6',
  '#E74C3C',
  '#F1C40F',
  '#34495E',
];

const normalizeBlogs = (blogs = []) =>
  [...blogs]
    .map((blog) => ({
      ...blog,
      id: Number(blog.id) || blog.id,
      timestamp: blog.timestamp ?? Date.now(),
      categories: blog.categories ?? ['personal'],
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------ */
const Home = () => {
  // Compute everything once at mount
  const [allBlogs] = useState(() => normalizeBlogs(db.blogs || []));
  const featured = allBlogs.slice(0, 5);
  const recent = allBlogs.slice(5, 14);
  const loading = false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* --- Autoplay (pauses on hover) --- */
  useEffect(() => {
    if (featured.length < 2 || paused) return;
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % featured.length),
      6000
    );
    return () => clearInterval(id);
  }, [featured.length, paused]);

  const goToSlide = useCallback(
    (index) => setActiveIndex(index % Math.max(featured.length, 1)),
    [featured.length]
  );

  const activeStory = featured[activeIndex];

  const excerpt = useMemo(() => {
    if (!activeStory?.body) return '';
    const text = stripHtml(activeStory.body);
    return text.length > 180 ? `${text.slice(0, 180)}…` : text;
  }, [activeStory]);

  /* --- Dynamic categories --- */
  const dynamicCategories = useMemo(() => {
    if (!allBlogs.length) return [];

    const counts = {};
    allBlogs.forEach((blog) => {
      blog.categories.forEach((cat) => {
        const normalized = cat.trim().toLowerCase();
        if (!counts[normalized]) {
          counts[normalized] = { name: cat, count: 0 };
        }
        counts[normalized].count += 1;
      });
    });

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map((cat, index) => ({
        name: cat.name,
        slug: cat.name,
        count: cat.count,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }));
  }, [allBlogs]);

  return (
    <div className="home">
      {/* FEATURED SPOTLIGHT */}
      {!loading && featured.length > 0 && (
        <section
          className="spotlight"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Featured stories"
        >
          <div className="spotlight__stage">
            {featured.map((story, index) => (
              <article
                key={story.id}
                className={`spotlight__slide ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                aria-hidden={index !== activeIndex}
              >
                <div className="spotlight__media">
                  {story.imageUrl ? (
                    <img
                      src={story.imageUrl}
                      alt=""
                      className="img-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="placeholder placeholder--dark">
                      <Icon type="story" className="icon--lg" />
                    </div>
                  )}
                  <div className="spotlight__scrim" />
                </div>

                <div className="spotlight__content">
                  <div className="meta spotlight__meta">
                    <span className="meta__category">
                      {story.categories?.[0]}
                    </span>
                    <span className="meta__divider">/</span>
                    <span>{formatDate(story.timestamp)}</span>
                  </div>

                  <h2 className="spotlight__title">{story.title}</h2>
                  <p className="spotlight__excerpt">{excerpt}</p>

                  <div className="spotlight__footer">
                    <span className="spotlight__author">By {story.author}</span>
                    <Link
                      to={`/blogs/${story.id}`}
                      className="btn btn--primary spotlight__cta"
                    >
                      <span>Read story</span>
                      <Icon type="arrow" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <nav className="spotlight__nav" aria-label="Slide navigation">
            {featured.map((_, index) => (
              <button
                key={index}
                className={`spotlight__dot ${
                  index === activeIndex ? 'is-active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </nav>

          <span className="spotlight__counter" aria-hidden="true">
            <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
            <span>/</span>
            <span>{String(featured.length).padStart(2, '0')}</span>
          </span>
        </section>
      )}

      {/* MAGAZINE FEATURE */}
      <section className="section magazine-feature">
        <div className="container">
          <div className="magazine-banner-feature">
            <div className="magazine-banner-feature__visual">
              <Link to="/Magazine" className="magazine-banner-feature__cover">
                <img src="/trend.jpg" alt="The Trend Magazine 2026" />
                <div className="magazine-banner-feature__overlay">
                  <span className="btn btn--primary">Explore Issue</span>
                </div>
              </Link>
            </div>
            <div className="magazine-banner-feature__content">
              <span className="label text-accent">The 2026 Issue</span>
              <h2 className="magazine-banner-feature__title">
                The Trend: Becoming
              </h2>
              <p className="magazine-banner-feature__text">
                A journey that tested us in so many ways. We began as dreamers,
                each stepping into postgraduate study with ambition and
                uncertainty in equal measure. This is our voice.
              </p>
              <div className="magazine-banner-feature__actions">
                <Link to="/Magazine" className="btn btn--primary">
                  <Icon type="magazine" />
                  <span>Read the Magazine</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT STORIES */}
      <section className="section">
        <header className="section-header">
          <div className="section-header__row">
            <h2 className="section-header__title">Recent stories</h2>
            <Link to="/AllStories" className="section-header__link">
              <span>View all</span>
              <Icon type="arrow" />
            </Link>
          </div>
          <div className="section-header__line" />
        </header>

        {recent.length > 0 ? (
          <div className="grid grid--cards">
            {recent.map((story, index) => (
              <Link
                to={`/blogs/${story.id}`}
                key={story.id}
                className="card story-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="story-card__media">
                  {story.imageUrl ? (
                    <img
                      src={story.imageUrl}
                      alt=""
                      className="img-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="placeholder">
                      <Icon type="story" className="icon--lg" />
                    </div>
                  )}
                </div>

                <div className="story-card__body">
                  <div className="meta">
                    <span className="meta__category">
                      {story.categories?.[0]}
                    </span>
                    <span className="meta__divider">/</span>
                    <span>{formatDate(story.timestamp)}</span>
                  </div>

                  <h3 className="story-card__title">{story.title}</h3>

                  <div className="story-card__footer">
                    <span>{story.author}</span>
                  </div>
                </div>

                <span className="story-card__arrow" aria-hidden="true">
                  <Icon type="arrow" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No stories available yet.</p>
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="section categories">
        <header className="section-header">
          <div className="section-header__row">
            <h2 className="section-header__title">Explore topics</h2>
          </div>
          <div className="section-header__line" />
        </header>

        <div className="grid grid--tiles categories__grid">
          {dynamicCategories.map((cat, index) => (
            <Link
              to={`/AllStories?category=${encodeURIComponent(cat.slug)}`}
              key={cat.slug}
              className="category"
              style={{
                '--category-color': cat.color,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div className="category__top">
                <h3 className="category__name">{cat.name}</h3>
                <Icon type="arrow" className="category__arrow" />
              </div>
              <span className="category__count">{cat.count} stories</span>
              <span className="category__accent" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about">
        <div className="grid grid--golden about__grid">
          <div className="about__content">
            <span className="label about__label">Who we are</span>
            <h2 className="about__title">
              Excellence in media &amp; communication
            </h2>
            <p className="about__text">
              The KIMC Postgraduate Mass Communication Class of 2025 brings
              together aspiring media professionals committed to excellence in
              journalism, strategic communication, and digital storytelling.
            </p>
            <Link to="/About" className="btn btn--primary">
              <span>Learn more</span>
              <Icon type="arrow" />
            </Link>
          </div>

          <div className="about__visual" aria-hidden="true">
            <div className="about__grid-tiles">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="about__tile"
                  style={{ animationDelay: `${i * 1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider divider--accent" />
      </div>
    </div>
  );
};

export default Home;
