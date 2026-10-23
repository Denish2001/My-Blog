import { Link } from 'react-router-dom';
import blogData from '../../server/db.json';
import './Bloglist.css';

/* ================================================================
   UTILITIES
================================================================ */
const stripHtml = (html = '') =>
  html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim();

const truncate = (text, n = 140) =>
  text.length > n ? `${text.slice(0, n).trimEnd()}…` : text;

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const readingTime = (body = '') => {
  const words = stripHtml(body).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const normalize = (blogs = []) =>
  blogs.map((b) => ({
    ...b,
    id: Number(b.id) || b.id,
    timestamp: b.timestamp ?? Date.now(),
    categories: b.categories?.length ? b.categories : ['uncategorized'],
  }));

const BLOGS = normalize(blogData.blogs || []);

/* ================================================================
   ICONS
================================================================ */
const ICONS = {
  story:
    'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  arrow: 'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  clock:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
};

const Icon = ({ name, className = '' }) => (
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
   CARD
================================================================ */
const BlogCard = ({ blog, index }) => {
  const excerpt = truncate(stripHtml(blog.body || ''), 140);

  return (
    <article
      className="blog-card"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link to={`/blogs/${blog.id}`} className="blog-card__link">
        <div className="blog-card__media">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt=""
              className="blog-card__img"
              loading="lazy"
            />
          ) : (
            <div className="blog-card__placeholder">
              <Icon name="story" className="icon--lg" />
            </div>
          )}

          {blog.categories[0] && (
            <span className="blog-card__badge">{blog.categories[0]}</span>
          )}
        </div>

        <div className="blog-card__body">
          <div className="blog-card__meta">
            <span>{formatDate(blog.timestamp)}</span>
            <span aria-hidden="true">·</span>
            <span className="blog-card__readtime">
              <Icon name="clock" className="icon--sm" />
              {readingTime(blog.body)}
            </span>
          </div>

          <h3 className="blog-card__title">{blog.title}</h3>
          <p className="blog-card__excerpt">{excerpt}</p>

          <div className="blog-card__footer">
            <Link
              to={`/AllStories?author=${encodeURIComponent(blog.author)}`}
              className="blog-card__author"
              onClick={(e) => e.stopPropagation()}
            >
              By {blog.author}
            </Link>
            <span className="blog-card__cta" aria-hidden="true">
              Read
              <Icon name="arrow" className="icon--sm" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

/* ================================================================
   LIST
================================================================ */
const BlogList = ({ title = 'Latest Stories' }) => {
  if (BLOGS.length === 0) {
    return (
      <section className="blog-list">
        <header className="section-header">
          <div className="section-header__row">
            <h2 className="section-header__title">{title}</h2>
          </div>
          <div className="section-header__line" />
        </header>

        <div className="empty-state">
          <Icon name="story" className="empty-state__icon" />
          <h3 className="empty-state__title">No stories yet</h3>
          <p className="empty-state__text">
            New work will appear here as the class publishes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-list">
      <header className="section-header">
        <div className="section-header__row">
          <div>
            <span className="label">Latest</span>
            <h2 className="section-header__title">{title}</h2>
          </div>
          <Link to="/AllStories" className="section-header__link">
            <span>All stories</span>
            <Icon name="arrow" />
          </Link>
        </div>
        <div className="section-header__line" />
      </header>

      <div className="blog-list__grid">
        {BLOGS.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
