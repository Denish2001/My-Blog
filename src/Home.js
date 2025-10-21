import BlogList from "./bloglist";
import db from "./Data/db.json";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './CSS/home.css';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('latest');

    // Define available categories - Gestalt: Similarity in organization
    const categories = [
        'all', 'crime', 'tragedy', 'politics', 'science', 'sport', 'international',
        'technology', 'business', 'personal', 'history', 'health', 'human interest', 'education', 'other'
    ];

    // Format date function - moved inside component
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown date';
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    useEffect(() => {
        filterAndSortBlogs();
    }, [blogs, selectedCategory, sortBy]);

    const loadBlogs = () => {
        try {
            // Combine blogs from localStorage and db.json
            const localStorageBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
            
            // Process db.json blogs to ensure consistent structure
            const dbBlogs = (db.blogs || []).map(blog => ({
                ...blog,
                // Ensure ID is a number and add timestamp if missing
                id: parseInt(blog.id) || Date.now() + Math.random(),
                timestamp: blog.timestamp || blog.id || Date.now(),
                categories: blog.categories || ['personal'], // Default category
                tags: blog.tags || []
            }));

            // Process localStorage blogs for consistent structure
            const processedLocalBlogs = localStorageBlogs.map(blog => ({
                ...blog,
                id: parseInt(blog.id),
                categories: blog.categories || ['personal'],
                tags: blog.tags || []
            }));

            const allBlogs = [...processedLocalBlogs, ...dbBlogs];
            
            // Remove duplicates based on ID
            const uniqueBlogs = allBlogs.filter((blog, index, self) => 
                index === self.findIndex(b => b.id === blog.id)
            );
            
            setBlogs(uniqueBlogs);
            setIsPending(false);
        } catch (err) {
            console.error('Error loading blogs:', err);
            setError('Failed to load blogs');
            setIsPending(false);
        }
    };

    const filterAndSortBlogs = () => {
        let filtered = [...blogs];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog => 
                blog.categories && 
                blog.categories.map(cat => cat.toLowerCase()).includes(selectedCategory.toLowerCase())
            );
        }

        // Sort blogs
        filtered.sort((a, b) => {
            const timeA = a.timestamp || a.id;
            const timeB = b.timestamp || b.id;
            
            switch (sortBy) {
                case 'latest':
                    return timeB - timeA;
                case 'oldest':
                    return timeA - timeB;
                case 'title':
                    return (a.title || '').localeCompare(b.title || '');
                default:
                    return timeB - timeA;
            }
        });

        setFilteredBlogs(filtered);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return ( 
        <div className="home-container">
            {/* Main Content Area */}
            <div className="home-content">

                 {/* Featured Stories Section */}
                {!isPending && !error && filteredBlogs.length > 0 && (
                    <section className="home-featured-stories">
                        <div className="home-section-header">
                            <h2 className="home-section-title">Our Featured Stories</h2>
                        </div>
                        
                        <div className="home-featured-grid">
                            {/* Main Featured Story - Gestalt: Figure/Ground emphasis */}
                            {filteredBlogs[0] && (
                                <article className="home-featured-card home-main-featured" style={{animationDelay: '0.1s'}}>
                                    <Link to={`/blogs/${filteredBlogs[0].id}`} className="home-featured-link">
                                        <div className="home-featured-image">
                                            <div className="home-image-placeholder">
                                                {filteredBlogs[0].imageUrl ? (
                                                    <img 
                                                        src={filteredBlogs[0].imageUrl} 
                                                        alt={filteredBlogs[0].title}
                                                        className="blog-image"
                                                    />
                                                ) : (
                                                    <span className="home-placeholder-icon">📖</span>
                                                )}
                                            </div>
                                            <div className="home-featured-badge">Featured</div>
                                        </div>
                                        <div className="home-featured-content">
                                            <div className="home-featured-meta">
                                                <span className="home-category-tag home-featured-tag">
                                                    {filteredBlogs[0].categories?.[0] || 'Featured'}
                                                </span>
                                                <span className="home-reading-time">5 min read</span>
                                            </div>
                                            <h3 className="home-featured-title">{filteredBlogs[0].title}</h3>
                                            <p className="home-featured-excerpt">
                                                {filteredBlogs[0].body && filteredBlogs[0].body.length > 120 
                                                    ? `${filteredBlogs[0].body.substring(0, 120).replace(/<br\s*\/?>/g, ' ')}...`
                                                    : filteredBlogs[0].body?.replace(/<br\s*\/?>/g, ' ')
                                                }
                                            </p>
                                            <div className="home-featured-author">
                                                <span className="home-author-name">By {filteredBlogs[0].author}</span>
                                                <span className="home-publish-date">
                                                    {formatDate(filteredBlogs[0].timestamp || filteredBlogs[0].id)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            )}
                            
                            {/* Secondary Featured Stories - Gestalt: Similarity & Proximity */}
                            <div className="home-secondary-featured">
                                {filteredBlogs.slice(1, 3).map((blog, index) => (
                                    <article key={blog.id} className="home-featured-card home-secondary" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                                        <Link to={`/blogs/${blog.id}`} className="home-featured-link">
                                            <div className="home-featured-image">
                                                <div className="home-image-placeholder home-small">
                                                    {blog.imageUrl ? (
                                                        <img 
                                                            src={blog.imageUrl}
                                                            alt={blog.title}
                                                            className="home-featured-image"
                                                        />
                                                    ) : (
                                                        <span className="home-placeholder-icon">📖</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="home-featured-content">
                                                <div className="home-featured-meta">
                                                    <span className="home-category-tag">
                                                        {blog.categories?.[0] || 'Story'}
                                                    </span>
                                                </div>
                                                <h3 className="home-featured-title">{blog.title}</h3>
                                                <div className="home-featured-author">
                                                    <span className="home-author-name">By {blog.author}</span>
                                                    <span className="home-publish-date">
                                                        {formatDate(blog.timestamp || blog.id)}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                        
                        {/* View All Link - Don Norman: Clear affordance */}
                        <div className="home-featured-footer">
                            <Link to="/AllStories" className="home-view-all-link">
                                <span>View All Stories</span>
                                <span className="home-link-arrow">→</span>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Controls Section - Gestalt: Proximity & Grouping */}
                <section className="home-controls-section">
                    <div className="home-controls-header">
                        <h2 className="home-controls-title">Explore Our Stories</h2>
                        <p className="home-controls-description">
                            Filter by category and sort to find exactly what you're looking for
                        </p>
                    </div>

                    <div className="home-controls-grid">
                        {/* Sort Controls - Don Norman: Clear affordances */}
                        <div className="home-control-group">
                            <label htmlFor="home-sort-select" className="home-control-label">
                                Sort Stories
                            </label>
                            <div className="home-select-wrapper">
                                <select 
                                    id="home-sort-select"
                                    value={sortBy} 
                                    onChange={handleSortChange}
                                    className="home-sort-select"
                                >
                                    <option value="latest">Latest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="title">Title A-Z</option>
                                </select>
                                <span className="home-select-arrow">▼</span>
                            </div>
                        </div>

                        {/* Category Filters - Gestalt: Similarity in interactive elements */}
                        <div className="home-control-group">
                            <h3 className="home-category-title">Browse Categories</h3>
                            <div className="home-category-grid">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={`home-category-card ${selectedCategory === category ? 'home-active' : ''}`}
                                        onClick={() => handleCategorySelect(category)}
                                        aria-pressed={selectedCategory === category}
                                    >
                                        <span className="home-category-name">
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </span>
                                        {selectedCategory === category && (
                                            <span className="home-active-indicator" aria-hidden="true">
                                                <span className="home-indicator-dot"></span>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Info - Don Norman: Feedback */}
                <div className="home-results-info">
                    <div className="home-results-content">
                        <span className="home-results-count">
                            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'story' : 'stories'}
                        </span>
                        {selectedCategory !== 'all' && (
                            <>
                                <span className="home-results-separator">in</span>
                                <span className="home-results-category">
                                    "{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}"
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content States - Gestalt: Figure/Ground for emphasis */}
                {error && (
                    <div className="home-error-state">
                        <div className="home-error-content">
                            <div className="home-error-icon">⚠️</div>
                            <div className="home-error-text">
                                <h3>Unable to Load Stories</h3>
                                <p>{error}</p>
                            </div>
                            <button onClick={loadBlogs} className="home-btn-retry">
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
                
                {isPending && (
                    <div className="home-loading-state">
                        <div className="home-loading-content">
                            <div className="home-loading-spinner"></div>
                            <div className="home-loading-text">
                                <h3>Loading Stories</h3>
                                <p>Curating the latest content for you...</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {!isPending && !error && (
                    <BlogList 
                        blogs={filteredBlogs} 
                        title={selectedCategory === 'all' ? "All Stories" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Stories`}
                    />
                )}
            </div>
        </div>
    );
}
 
export default Home;