import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import db from '../../server/db.json';
import './Allstories.css';

/* ================================================================
   CONSTANTS
================================================================ */
const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'title', label: 'A–Z' },
];

const CATEGORY_LABELS = {
  all: 'All',
  crime: 'Crime',
  tragedy: 'Tragedy',
  politics: 'Politics',
  science: 'Science',
  sport: 'Sport',
  international: 'International',
  technology: 'Technology',
  personal: 'Personal',
  history: 'History',
  health: 'Health',
  'human interest': 'Human Interest',
  education: 'Education',
  other: 'Other',
};

const ALL_CATEGORIES = [
  'all',
  ...Object.keys(CATEGORY_LABELS).filter((k) => k !== 'all'),
];

/* ================================================================
   ICONS
================================================================ */
const ICONS = {
  search:
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  story:
    'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  grid: 'M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z',
  list: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
  close:
    'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
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
   UTILITIES
================================================================ */
const stripHtml = (html = '') =>
  html
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();

const truncate = (text, n = 140) =>
  text.length > n ? `${text.slice(0, n).trimEnd()}…` : text;

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const normalizeBlogs = (blogs = []) =>
  blogs.map((b) => ({
    ...b,
    id: Number(b.id) || b.id,
    timestamp: b.timestamp ?? Date.now(),
    categories: b.categories?.length ? b.categories : ['personal'],
    _search: [b.title, b.body, b.author, ...(b.categories ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  }));

/* ================================================================
   HOOKS
================================================================ */
const useDebounced = (value, delay = 200) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
};

/* ================================================================
   SUB-COMPONENTS
================================================================ */
const StoryCard = ({ blog, view }) => {
  const excerpt = truncate(
    stripHtml(blog.body || ''),
    view === 'list' ? 200 : 120
  );

  return (
    <Link to={`/blogs/${blog.id}`} className={`story story--${view}`}>
      <div className="story__media">
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt=""
            className="img-cover"
            loading="lazy"
          />
        ) : (
          <div className="placeholder">
            <Icon name="story" className="icon--lg" />
          </div>
        )}
      </div>

      <div className="story__body">
        <div className="story__meta">
          <span className="story__category">
            {CATEGORY_LABELS[blog.categories[0]] ?? blog.categories[0]}
          </span>
          <span className="story__sep">·</span>
          <time dateTime={new Date(blog.timestamp).toISOString()}>
            {formatDate(blog.timestamp)}
          </time>
        </div>

        <h3 className="story__title">{blog.title}</h3>
        <p className="story__excerpt">{excerpt}</p>

        <div className="story__footer">
          <span className="story__author">By {blog.author}</span>
          <span className="story__readmore">
            Read
            <Icon name="arrow" className="icon--sm" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const FilterChip = ({ label, onRemove }) => (
  <button
    type="button"
    className="chip"
    onClick={onRemove}
    aria-label={`Remove filter: ${label}`}
  >
    <span>{label}</span>
    <Icon name="close" className="chip__x" />
  </button>
);

/* ================================================================
   PAGE
================================================================ */
const AllStories = () => {
  const [params, setParams] = useSearchParams();

  const category = params.get('category') || 'all';
  const author = params.get('author') || '';
  const sort = SORTS.some((s) => s.value === params.get('sort'))
    ? params.get('sort')
    : 'newest';
  const view = params.get('view') === 'list' ? 'list' : 'grid';

  const [query, setQuery] = useState(params.get('q') || '');
  const debouncedQuery = useDebounced(query, 200);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (debouncedQuery) next.set('q', debouncedQuery);
    else next.delete('q');
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // Compute initial data once
  const [blogs] = useState(() => {
    try {
      return normalizeBlogs(db.blogs || []);
    } catch (err) {
      console.error('Failed to load stories:', err);
      return [];
    }
  });

  const loading = false;
  const error = null;

  const setParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(params);
      if (!value || (value === 'all' && key === 'category')) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    const filtered = blogs.filter((b) => {
      const inCategory =
        category === 'all' ||
        b.categories
          .map((c) => c.toLowerCase())
          .includes(category.toLowerCase());
      const inAuthor =
        !author || (b.author || '').toLowerCase() === author.toLowerCase();
      const inQuery = !q || b._search.includes(q);
      return inCategory && inAuthor && inQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'oldest') return a.timestamp - b.timestamp;
      if (sort === 'title') return a.title.localeCompare(b.title);
      return b.timestamp - a.timestamp;
    });
  }, [blogs, category, author, debouncedQuery, sort]);

  const categoryCounts = useMemo(() => {
    const counts = { all: blogs.length };
    for (const b of blogs) {
      for (const c of b.categories) {
        const key = c.toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      }
    }
    return counts;
  }, [blogs]);

  const hasFilters =
    category !== 'all' || !!author || debouncedQuery.length > 0;

  const searchRef = useRef(null);

  const clearAll = () => {
    setQuery('');
    setParams(new URLSearchParams(), { replace: true });
    searchRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          document.activeElement?.tagName
        )
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="stories-page">
      <header className="stories-hero">
        <div className="container">
          <span className="label">Archive</span>
          <h1 className="stories-hero__title">Stories</h1>
          <p className="stories-hero__lede">
            Reporting, essays, and commentary from KIMC's Postgraduate Mass
            Communication Class of 2025.
          </p>
        </div>
      </header>

      <section className="stories-controls" aria-label="Filter and sort">
        <div className="container">
          <div className="stories-search">
            <Icon name="search" className="stories-search__icon" />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories, authors, topics…"
              aria-label="Search stories"
              className="stories-search__input"
            />
            {query && (
              <button
                type="button"
                className="stories-search__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <Icon name="close" />
              </button>
            )}
            <kbd className="stories-search__kbd" aria-hidden="true">
              /
            </kbd>
          </div>

          <div className="stories-toolbar">
            <label className="stories-sort">
              <span className="visually-hidden">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setParam('sort', e.target.value)}
                className="input stories-sort__select"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="stories-view" role="group" aria-label="View mode">
              <button
                type="button"
                className={`stories-view__btn ${
                  view === 'grid' ? 'is-active' : ''
                }`}
                onClick={() => setParam('view', 'grid')}
                aria-pressed={view === 'grid'}
                aria-label="Grid view"
              >
                <Icon name="grid" />
              </button>
              <button
                type="button"
                className={`stories-view__btn ${
                  view === 'list' ? 'is-active' : ''
                }`}
                onClick={() => setParam('view', 'list')}
                aria-pressed={view === 'list'}
                aria-label="List view"
              >
                <Icon name="list" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <nav className="stories-categories" aria-label="Filter by category">
        <div className="container stories-categories__inner">
          {ALL_CATEGORIES.map((cat) => {
            const label = CATEGORY_LABELS[cat] ?? cat;
            const count = categoryCounts[cat] ?? 0;
            const active = category === cat;
            if (cat !== 'all' && count === 0) return null;
            return (
              <button
                key={cat}
                type="button"
                className={`cat-chip ${active ? 'is-active' : ''}`}
                onClick={() => setParam('category', cat)}
                aria-pressed={active}
              >
                <span>{label}</span>
                <span className="cat-chip__count">{count}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <section className="section stories-results">
        <div className="container">
          <div className="stories-results__head">
            <p
              className="stories-results__count"
              role="status"
              aria-live="polite"
            >
              {loading
                ? 'Loading stories…'
                : `${results.length} ${
                    results.length === 1 ? 'story' : 'stories'
                  }${hasFilters ? ' matching your filters' : ''}`}
            </p>

            {hasFilters && (
              <div
                className="stories-results__chips"
                aria-label="Active filters"
              >
                {category !== 'all' && (
                  <FilterChip
                    label={CATEGORY_LABELS[category] ?? category}
                    onRemove={() => setParam('category', 'all')}
                  />
                )}
                {author && (
                  <FilterChip
                    label={`By ${author}`}
                    onRemove={() => setParam('author', '')}
                  />
                )}
                {debouncedQuery && (
                  <FilterChip
                    label={`“${debouncedQuery}”`}
                    onRemove={() => setQuery('')}
                  />
                )}
                <button
                  type="button"
                  className="stories-results__clear"
                  onClick={clearAll}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading-state" aria-hidden="true">
              <div className="loading-spinner" />
            </div>
          ) : error ? (
            <div className="empty-state" role="alert">
              <Icon name="story" className="empty-state__icon" />
              <h2 className="empty-state__title">Something went wrong</h2>
              <p className="empty-state__text">{error}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="empty-state">
              <Icon name="story" className="empty-state__icon" />
              <h2 className="empty-state__title">No stories match</h2>
              <p className="empty-state__text">
                Try a different search term or clear your filters.
              </p>
              {hasFilters && (
                <button className="btn btn--primary" onClick={clearAll}>
                  Show all stories
                </button>
              )}
            </div>
          ) : (
            <div className={`stories-grid stories-grid--${view}`}>
              {results.map((blog) => (
                <StoryCard key={blog.id} blog={blog} view={view} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllStories;
