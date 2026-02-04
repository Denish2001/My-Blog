import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "./server/db.json";
import "./CSS/allstories.css";

const AllStories = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Define available categories
  const categories = [
    "all",
    "crime",
    "tragedy",
    "politics",
    "science",
    "sport",
    "international",
    "technology",
    "personal",
    "history",
    "health",
    "human interest",
    "education",
    "other",
  ];

  // Format date function
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    try {
      // Simulate loading delay
      setTimeout(() => {
        const dbBlogs = (db.blogs || []).map((blog) => ({
          ...blog,
          id: parseInt(blog.id) || Date.now() + Math.random(),
          timestamp: blog.timestamp || blog.id || Date.now(),
          categories: blog.categories || ["personal"],
        }));

        setBlogs(dbBlogs);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error loading blogs:", err);
      setLoading(false);
    }
  };

  // Filter blogs based on selected category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (blog.categories &&
        blog.categories
          .map((cat) => cat.toLowerCase())
          .includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      !searchQuery ||
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort by latest
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const timeA = a.timestamp || a.id;
    const timeB = b.timestamp || b.id;
    return timeB - timeA;
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  // Simple icon component
  const Icon = ({ type }) => (
    <svg viewBox="0 0 24 24" className={`icon icon-${type}`}>
      {type === "search" && (
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      )}
      {type === "story" && (
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      )}
      {type === "loading" && (
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      )}
    </svg>
  );

  return (
    <div className="stories-container">
      {/* Header */}
      <header className="stories-header">
        <h1 className="stories-title">Stories</h1>
        <p className="stories-subtitle">
          Insights from KIMC Mass Communication Class of 2025
        </p>
      </header>

      {/* Controls */}
      <div className="stories-controls">
        {/* Search */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <Icon type="search" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              className="search-input"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tag ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Stories" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span className="results-count">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "story" : "stories"}
          </span>
          {(selectedCategory !== "all" || searchQuery) && (
            <button onClick={clearFilters} className="clear-filters">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="stories-content">
        {loading ? (
          <div className="loading-state">
            <Icon type="loading" />
            <p>Loading stories...</p>
          </div>
        ) : sortedBlogs.length > 0 ? (
          <div className="stories-grid">
            {sortedBlogs.map((blog) => (
              <Link
                to={`/blogs/${blog.id}`}
                key={blog.id}
                className="story-card"
              >
                {/* Image/Placeholder */}
                <div className="story-image">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="story-img"
                    />
                  ) : (
                    <div className="image-placeholder">
                      <Icon type="story" />
                    </div>
                  )}
                  <div className="category-label">
                    {blog.categories?.[0] || "Story"}
                  </div>
                </div>

                {/* Content */}
                <div className="story-content">
                  <div className="story-meta">
                    <span className="story-date">
                      {formatDate(blog.timestamp)}
                    </span>
                    <span className="story-author">{blog.author}</span>
                  </div>
                  <h3 className="story-title">{blog.title}</h3>
                  <p className="story-excerpt">
                    {blog.body && blog.body.length > 120
                      ? `${blog.body.substring(0, 120).replace(/<br\s*\/?>/g, " ")}...`
                      : blog.body?.replace(/<br\s*\/?>/g, " ")}
                  </p>
                  <div className="story-tags">
                    {blog.categories?.slice(0, 2).map((category, index) => (
                      <span key={index} className="story-tag">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon type="story" />
            <h3>No stories found</h3>
            <p>
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filter"
                : "No stories published yet"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button onClick={clearFilters} className="primary-button">
                Show all stories
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStories;
