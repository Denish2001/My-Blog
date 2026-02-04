import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "./server/db.json";
import "./CSS/home.css";

const Home = () => {
  const [featuredStories, setFeaturedStories] = useState([]);
  const [recentStories, setRecentStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Format date function
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    loadStories();

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Auto-rotate featured stories
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % featuredStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredStories.length]);

  const loadStories = () => {
    try {
      setTimeout(() => {
        const dbBlogs = (db.blogs || []).map((blog) => ({
          ...blog,
          id: parseInt(blog.id) || Date.now() + Math.random(),
          timestamp: blog.timestamp || blog.id || Date.now(),
          categories: blog.categories || ["personal"],
        }));

        const sortedBlogs = [...dbBlogs].sort((a, b) => {
          const timeA = a.timestamp || a.id;
          const timeB = b.timestamp || b.id;
          return timeB - timeA;
        });

        setFeaturedStories(sortedBlogs.slice(0, 5));
        setRecentStories(sortedBlogs.slice(5, 14));
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error loading stories:", err);
      setLoading(false);
    }
  };

  const Icon = ({ type }) => (
    <svg
      viewBox="0 0 24 24"
      className={`icon icon-${type}`}
      fill="currentColor"
    >
      {type === "story" && (
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      )}
      {type === "arrow" && (
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      )}
      {type === "circle" && (
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeWidth="0.5"
          fill="none"
          stroke="currentColor"
        />
      )}
    </svg>
  );

  return (
    <div className="home-container">
      {/* Featured Story - Full Bleed */}
      {!loading && featuredStories.length > 0 && (
        <section className="featured-spotlight">
          <div className="spotlight-container">
            {featuredStories.map((story, index) => (
              <div
                key={story.id}
                className={`spotlight-slide ${index === activeFeature ? "active" : ""}`}
              >
                <div className="spotlight-image">
                  {story.imageUrl ? (
                    <img src={story.imageUrl} alt={story.title} />
                  ) : (
                    <div className="spotlight-placeholder">
                      <Icon type="story" />
                    </div>
                  )}
                  <div className="spotlight-overlay"></div>
                </div>

                <div className="spotlight-content">
                  <div className="spotlight-meta">
                    <span className="spotlight-category">
                      {story.categories?.[0]}
                    </span>
                    <span className="spotlight-divider">—</span>
                    <span className="spotlight-date">
                      {formatDate(story.timestamp)}
                    </span>
                  </div>

                  <h2 className="spotlight-title">{story.title}</h2>

                  <p className="spotlight-excerpt">
                    {story.body && story.body.length > 160
                      ? `${story.body.substring(0, 160).replace(/<br\s*\/?>/g, " ")}...`
                      : story.body?.replace(/<br\s*\/?>/g, " ")}
                  </p>

                  <div className="spotlight-footer">
                    <span className="spotlight-author">By {story.author}</span>
                    <Link to={`/blogs/${story.id}`} className="spotlight-cta">
                      <span>Read Story</span>
                      <Icon type="arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="spotlight-nav">
            {featuredStories.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === activeFeature ? "active" : ""}`}
                onClick={() => setActiveFeature(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <Icon type="circle" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Recent Stories Grid - Rams Modularity */}
      <section className="recent-section">
        <div className="section-header">
          <div className="header-content">
            <h2 className="section-title">Recent Stories</h2>
            <Link to="/AllStories" className="section-link">
              <span>View All</span>
              <Icon type="arrow" />
            </Link>
          </div>
          <div className="header-line"></div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
          </div>
        ) : recentStories.length > 0 ? (
          <div className="stories-grid">
            {recentStories.map((story, index) => (
              <Link
                to={`/blogs/${story.id}`}
                key={story.id}
                className="story-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="card-image">
                  {story.imageUrl ? (
                    <img src={story.imageUrl} alt={story.title} />
                  ) : (
                    <div className="card-placeholder">
                      <Icon type="story" />
                    </div>
                  )}
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span className="card-category">
                      {story.categories?.[0]}
                    </span>
                    <span className="card-date">
                      {formatDate(story.timestamp)}
                    </span>
                  </div>

                  <h3 className="card-title">{story.title}</h3>

                  <div className="card-footer">
                    <span className="card-author">{story.author}</span>
                  </div>
                </div>

                <div className="card-hover-indicator">
                  <Icon type="arrow" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No stories available</p>
          </div>
        )}
      </section>

      {/* Categories - Ive Precision */}
      <section className="categories-section">
        <div className="section-header">
          <div className="header-content">
            <h2 className="section-title">Explore Topics</h2>
          </div>
          <div className="header-line"></div>
        </div>

        <div className="categories-grid">
          {[
            { name: "Politics", count: 12, color: "#0066CC" },
            { name: "Technology", count: 8, color: "#00A86B" },
            { name: "Education", count: 15, color: "#FF6B35" },
            { name: "Human Interest", count: 10, color: "#9B59B6" },
          ].map((category, index) => (
            <Link
              to={`/AllStories?category=${category.name.toLowerCase()}`}
              key={category.name}
              className="category-card"
              style={{
                animationDelay: `${index * 0.1}s`,
                "--category-color": category.color,
              }}
            >
              <div className="category-header">
                <h3 className="category-name">{category.name}</h3>
                <Icon type="arrow" />
              </div>
              <div className="category-count">{category.count} Stories</div>
              <div className="category-accent"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Preview - Da Vinci Proportion */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-content">
            <div className="about-label">Who We Are</div>
            <h2 className="about-title">Excellence in Media & Communication</h2>
            <p className="about-description">
              The KIMC Postgraduate Mass Communication Class of 2025 brings
              together aspiring media professionals committed to excellence in
              journalism, strategic communication, and digital storytelling.
            </p>
            <Link to="/about" className="about-cta">
              <span>Learn More</span>
              <Icon type="arrow" />
            </Link>
          </div>

          <div className="about-visual">
            <div className="visual-grid">
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Accent */}
      <div className="footer-accent">
        <div className="accent-line"></div>
      </div>
    </div>
  );
};

export default Home;
