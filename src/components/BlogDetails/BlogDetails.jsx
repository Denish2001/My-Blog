import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import blogData from '../../server/db.json';
import './Blogdetails.css';

/* ================================================================
   UTILITIES
================================================================ */
const stripHtml = (html = '') =>
  html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim();

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const readingTime = (body = '') => {
  const words = stripHtml(body).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

/* ================================================================
   ICONS
================================================================ */
const ICONS = {
  back: 'M19 12H5m7 7-7-7 7-7',
  calendar:
    'M8 7V3m8 4V3M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Zm-2-10h18',
  user: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0',
  clock: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  share:
    'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  twitter:
    'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z',
  facebook:
    'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
  whatsapp:
    'M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.77.91.86 1.69 1.14 1.93 1.26.24.12.39.1.54-.06.17-.18.7-.8.87-1.07.18-.26.34-.21.56-.12.22.1 1.38.65 1.62.77.24.12.4.18.46.28.06.11.04.63-.21 1.19-.24.55-1.4 1.07-1.94 1.11-.53.06-.96.02-2.83-.74zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  error:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  story:
    'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  arrow: 'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
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
   SHARE HOOK
================================================================ */
const useShare = (title) => {
  const [copied, setCopied] = useState(false);
  const [supported] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return !!navigator.share;
  });
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const nativeShare = async () => {
    if (!supported) return;
    try {
      await navigator.share({ title, url });
    } catch {
      /* user cancelled */
    }
  };

  return { url, copy, nativeShare, copied, supported };
};

/* ================================================================
   SHARE BAR
================================================================ */
const ShareBar = ({ title, compact = false }) => {
  const { url, copy, nativeShare, copied, supported } = useShare(title);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      name: 'twitter',
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  return (
    <div className={`share ${compact ? 'share--compact' : ''}`}>
      <span className="share__label">Share</span>

      <div className="share__actions">
        {supported && (
          <button
            type="button"
            className="share__btn share__btn--native"
            onClick={nativeShare}
            aria-label="Share this story"
          >
            <Icon name="share" />
            <span>Share</span>
          </button>
        )}

        {targets.map((t) => (
          <a
            key={t.name}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="share__btn"
            aria-label={`Share on ${t.label}`}
          >
            <Icon name={t.name} />
            {!compact && <span>{t.label}</span>}
          </a>
        ))}

        <button
          type="button"
          className={`share__btn share__btn--copy ${copied ? 'is-copied' : ''}`}
          onClick={copy}
          aria-label="Copy link"
          aria-live="polite"
        >
          <Icon name={copied ? 'check' : 'link'} />
          {!compact && <span>{copied ? 'Copied' : 'Copy link'}</span>}
        </button>
      </div>
    </div>
  );
};

/* ================================================================
   READING PROGRESS
================================================================ */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (el.scrollTop / max) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="reading-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/* ================================================================
   BODY RENDERER
================================================================ */
const renderBody = (body) => {
  if (typeof body !== 'string') return null;
  return body
    .split(/<br\s*\/?>|\r?\n/i)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, i) => <p key={i}>{paragraph}</p>);
};

/* ================================================================
   PAGE
================================================================ */
const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Compute the blog once
  const blog =
    (blogData.blogs || []).find((b) => String(b.id) === String(id)) || null;
  const loading = false;

  // Only use effect for side effect: scroll on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  /* Related stories */
  const related = useMemo(() => {
    if (!blog) return [];
    const cats = blog.categories ?? [];
    return (blogData.blogs || [])
      .filter((b) => String(b.id) !== String(blog.id))
      .filter((b) =>
        cats.length === 0
          ? false
          : (b.categories || []).some((c) => cats.includes(c))
      )
      .slice(0, 3);
  }, [blog]);

  /* Author's other stories */
  const authorStories = useMemo(() => {
    if (!blog) return 0;
    return (blogData.blogs || []).filter(
      (b) => b.author === blog.author && String(b.id) !== String(blog.id)
    ).length;
  }, [blog]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="blog-details">
        <div className="loading-state" role="status" aria-live="polite">
          <div className="loading-spinner" />
          <p>Loading story…</p>
        </div>
      </div>
    );
  }

  /* ---------- Not found ---------- */
  if (!blog) {
    return (
      <div className="blog-details">
        <div className="container blog-notfound">
          <Icon name="error" className="blog-notfound__icon" />
          <h1 className="blog-notfound__title">Story not found</h1>
          <p className="blog-notfound__text">
            The story you're looking for doesn't exist or may have been moved.
          </p>
          <div className="blog-notfound__actions">
            <Link to="/AllStories" className="btn btn--primary">
              <span>Browse stories</span>
              <Icon name="arrow" />
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Full article ---------- */
  return (
    <div className="blog-details">
      <ReadingProgress />

      <div className="container blog-back">
        <button
          type="button"
          className="btn btn--link"
          onClick={() => navigate(-1)}
        >
          <Icon name="back" className="icon--sm" />
          <span>Back</span>
        </button>
      </div>

      <article className="blog-article container">
        {blog.categories?.length > 0 && (
          <div className="blog-article__eyebrow">
            {blog.categories.map((c) => (
              <Link
                key={c}
                to={`/AllStories?category=${encodeURIComponent(
                  c.toLowerCase()
                )}`}
                className="badge"
              >
                {c}
              </Link>
            ))}
          </div>
        )}

        <h1 className="blog-article__title">{blog.title}</h1>

        <div className="blog-article__meta">
          <Link
            to={`/AllStories?author=${encodeURIComponent(blog.author)}`}
            className="blog-article__author"
          >
            <Icon name="user" className="icon--sm" />
            <span>{blog.author}</span>
          </Link>

          <span className="blog-article__dot" aria-hidden="true">
            ·
          </span>

          <span className="blog-article__metaitem">
            <Icon name="calendar" className="icon--sm" />
            <time dateTime={new Date(blog.timestamp).toISOString()}>
              {formatDate(blog.timestamp)}
            </time>
          </span>

          <span className="blog-article__dot" aria-hidden="true">
            ·
          </span>

          <span className="blog-article__metaitem">
            <Icon name="clock" className="icon--sm" />
            {readingTime(blog.body)}
          </span>
        </div>

        {blog.imageUrl && (
          <figure className="blog-article__figure">
            <img
              src={blog.imageUrl}
              alt=""
              className="blog-article__img"
              loading="eager"
            />
          </figure>
        )}

        <div className="blog-article__share-top">
          <ShareBar title={blog.title} />
        </div>

        <div className="blog-article__body">{renderBody(blog.body)}</div>

        <div className="blog-article__share-bottom">
          <ShareBar title={blog.title} />
        </div>

        <aside className="author-card">
          <div className="author-card__avatar" aria-hidden="true">
            {blog.author?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <div className="author-card__content">
            <span className="label">Written by</span>
            <h3 className="author-card__name">{blog.author}</h3>
            <p className="author-card__text">
              Member of the KIMC Postgraduate Mass Communication Class of 2025.
            </p>
            <div className="author-card__actions">
              <Link
                to={`/AllStories?author=${encodeURIComponent(blog.author)}`}
                className="btn btn--primary"
              >
                <span>
                  {authorStories > 0
                    ? `Read more by ${blog.author.split(' ')[0]}`
                    : `View ${blog.author.split(' ')[0]}'s stories`}
                </span>
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="related container">
          <header className="section-header">
            <div className="section-header__row">
              <div>
                <span className="label">Keep reading</span>
                <h2 className="section-header__title">Related stories</h2>
              </div>
              <Link to="/AllStories" className="section-header__link">
                <span>All stories</span>
                <Icon name="arrow" />
              </Link>
            </div>
            <div className="section-header__line" />
          </header>

          <div className="related__grid">
            {related.map((r) => (
              <Link key={r.id} to={`/blogs/${r.id}`} className="related-card">
                <div className="related-card__media">
                  {r.imageUrl ? (
                    <img
                      src={r.imageUrl}
                      alt=""
                      className="related-card__img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="placeholder">
                      <Icon name="story" className="icon--lg" />
                    </div>
                  )}
                </div>
                <div className="related-card__body">
                  <span className="related-card__category">
                    {r.categories?.[0] ?? 'Story'}
                  </span>
                  <h3 className="related-card__title">{r.title}</h3>
                  <span className="related-card__meta">
                    {formatDate(r.timestamp)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
