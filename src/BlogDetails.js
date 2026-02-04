import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./CSS/blogdetails.css";
import blogData from "./server/db.json";

const BlogDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = () => {
    try {
      setLoading(true);

      // Find the blog by ID
      const foundBlog = blogData.blogs.find((blog) => blog.id === id);

      if (!foundBlog) {
        throw new Error("Story not found");
      }

      setBlog(foundBlog);
    } catch (err) {
      console.error("Error loading blog:", err);
    } finally {
      setLoading(false);
    }
  };

  // Simple icon components
  const Icon = ({ type }) => (
    <svg viewBox="0 0 24 24" className={`icon icon-${type}`}>
      {type === "arrow" && <path d="M19 12H5M12 19l-7-7 7-7" />}
      {type === "calendar" && (
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      )}
      {type === "user" && (
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      )}
      {type === "clock" && (
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      {type === "error" && (
        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      )}
    </svg>
  );

  // Format date function
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate reading time
  const getReadingTime = (body) => {
    if (!body) return "1 min";
    const wordCount = body.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  };

  return (
    <div className="blog-details">
      {/* Back Navigation */}
      <div className="blog-nav">
        <button onClick={() => history.goBack()} className="back-button">
          <Icon type="arrow" />
          Back
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <Icon type="loading" />
          <p>Loading story...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && !blog && (
        <div className="error-state">
          <Icon type="error" />
          <h3>Story not found</h3>
          <p>The story you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => history.push("/")} className="primary-button">
            Return home
          </button>
        </div>
      )}

      {/* Blog Content */}
      {!loading && blog && (
        <article className="blog-article">
          {/* Header */}
          <header className="blog-header">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="blog-categories">
                {blog.categories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="blog-title">{blog.title}</h1>

            {/* Meta Information */}
            <div className="blog-meta">
              <div className="meta-item">
                <Icon type="user" />
                <span>{blog.author}</span>
              </div>

              <div className="meta-item">
                <Icon type="calendar" />
                <span>{formatDate(blog.timestamp)}</span>
              </div>

              <div className="meta-item">
                <Icon type="clock" />
                <span>{getReadingTime(blog.body)}</span>
              </div>
            </div>

            {/* Featured Image */}
            {blog.imageUrl && (
              <div className="blog-image">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="image-content"
                  loading="lazy"
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="blog-content">
            {typeof blog.body === "string" && blog.body.includes("<br>") ? (
              <div
                className="blog-body-html"
                dangerouslySetInnerHTML={{ __html: blog.body }}
              />
            ) : (
              <div className="blog-body-text">{blog.body}</div>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              <div className="tags-label">Topics:</div>
              <div className="tags-list">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Footer */}
          <div className="author-footer">
            <div className="author-info">
              <h4>About the author</h4>
              <p>
                {blog.author} is a member of the KIMC Postgraduate Mass
                Communication Class of 2025, specializing in
                {blog.categories && blog.categories[0]
                  ? ` ${blog.categories[0].toLowerCase()}`
                  : " media studies"}
                .
              </p>
            </div>
          </div>

          {/* Related Content Link */}
          <div className="related-content">
            <p>Explore more stories from our class</p>
            <button
              onClick={() => history.push("/AllStories")}
              className="secondary-button"
            >
              View all stories
            </button>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
