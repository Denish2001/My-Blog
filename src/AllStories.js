import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from 'react';
import './CSS/allstories.css';

const AllStories = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');

    // Define available categories
    const categories = [
        'all', 'crime', 'tragedy', 'politics', 'science', 'sport', 'international',
        'technology', 'personal', 'history', 'health', 'human interest', 'education', 'other'
    ];

    // Format date function
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
    }, [blogs, selectedCategory, sortBy, searchQuery]);

    const loadBlogs = () => {
        try {
            // Combine blogs from localStorage and db.json
            const localStorageBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
            const dbBlogs = (require('./Data/db.json').blogs || []).map(blog => ({
                ...blog,
                id: parseInt(blog.id) || Date.now() + Math.random(),
                timestamp: blog.timestamp || blog.id || Date.now(),
                categories: blog.categories || ['personal'],
                tags: blog.tags || []
            }));

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
            setError('Failed to load stories');
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

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(blog => 
                blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.categories?.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearFilters = () => {
        setSelectedCategory('all');
        setSearchQuery('');
        setSortBy('latest');
    };

    // Custom SVG Icons
    const SearchIcon = () => (
        <svg viewBox="0 0 24 24" className="search-icon">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
    );

    const SortIcon = () => (
        <svg viewBox="0 0 24 24" className="sort-icon">
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
        </svg>
    );

    const ErrorIcon = () => (
        <svg viewBox="0 0 24 24" className="error-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
    );

    const LoadingIcon = () => (
        <svg viewBox="0 0 24 24" className="loading-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
    );

    const EmptyIcon = () => (
        <svg viewBox="0 0 24 24" className="empty-icon">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
    );

    const StoryIcon = () => (
        <svg viewBox="0 0 24 24" className="story-icon">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
    );

    return ( 
        <div className="stories-collection-container">
            {/* Hero Section */}
            

            {/* Main Content */}
            <div className="stories-collection-main">
                {/* Controls Section */}
                <section className="stories-collection-controls">
                    <div className="collection-controls-header">
                        <h2 className="collection-controls-title">Browse Our Collection</h2>
                        <p className="collection-controls-description">
                            Filter, search, and sort to discover stories that match your interests
                        </p>
                    </div>

                    <div className="collection-controls-grid">
                        {/* Search Bar */}
                        <div className="collection-control-group collection-control-group-full">
                            <label htmlFor="collection-search-input" className="collection-control-label">
                                Search Stories
                            </label>
                            <div className="collection-search-wrapper">
                                <input
                                    type="text"
                                    id="collection-search-input"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="collection-search-input"
                                    placeholder="Search by title, content, author, or category..."
                                />
                                <SearchIcon />
                            </div>
                        </div>

                        {/* Sort Controls */}
                        <div className="collection-control-group">
                            <label htmlFor="collection-sort-select" className="collection-control-label">
                                Sort Stories
                            </label>
                            <div className="collection-select-wrapper">
                                <select 
                                    id="collection-sort-select"
                                    value={sortBy} 
                                    onChange={handleSortChange}
                                    className="collection-sort-select"
                                >
                                    <option value="latest">Latest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="title">Title A-Z</option>
                                </select>
                                <SortIcon />
                            </div>
                        </div>

                        {/* Clear Filters */}
                        <div className="collection-control-group">
                            <button 
                                onClick={clearFilters}
                                className="collection-clear-filters-btn"
                                disabled={selectedCategory === 'all' && !searchQuery && sortBy === 'latest'}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="collection-category-section">
                        <h3 className="collection-category-title">Browse by Category</h3>
                        <div className="collection-category-grid">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`collection-category-card ${selectedCategory === category ? 'collection-category-card-active' : ''}`}
                                    onClick={() => handleCategorySelect(category)}
                                    aria-pressed={selectedCategory === category}
                                >
                                    <span className="collection-category-name">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </span>
                                    {selectedCategory === category && (
                                        <span className="collection-active-indicator" aria-hidden="true">
                                            <span className="collection-indicator-dot"></span>
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results Info */}
                <div className="collection-results-info">
                    <div className="collection-results-content">
                        <span className="collection-results-count">
                            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'story' : 'stories'}
                        </span>
                        {(selectedCategory !== 'all' || searchQuery) && (
                            <>
                                <span className="collection-results-separator">matching</span>
                                {selectedCategory !== 'all' && (
                                    <span className="collection-results-category">
                                        "{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}"
                                    </span>
                                )}
                                {selectedCategory !== 'all' && searchQuery && (
                                    <span className="collection-results-separator">and</span>
                                )}
                                {searchQuery && (
                                    <span className="collection-results-search">
                                        "{searchQuery}"
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Content States */}
                {error && (
                    <div className="stories-collection-error">
                        <div className="stories-collection-error-content">
                            <ErrorIcon />
                            <div className="stories-collection-error-text">
                                <h3>Unable to Load Stories</h3>
                                <p>{error}</p>
                            </div>
                            <button onClick={loadBlogs} className="collection-btn-retry">
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
                
                {isPending && (
                    <div className="stories-collection-loading">
                        <div className="stories-collection-loading-content">
                            <div className="stories-collection-loading-spinner">
                                <LoadingIcon />
                            </div>
                            <div className="stories-collection-loading-text">
                                <h3>Loading Stories</h3>
                                <p>Curating our complete collection for you...</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Stories Grid */}
                {!isPending && !error && filteredBlogs.length > 0 && (
                    <section className="stories-collection-grid-section">
                        <div className="stories-collection-grid">
                            {filteredBlogs.map((blog) => (
                                <article key={blog.id} className="stories-collection-card">
                                    <Link to={`/blogs/${blog.id}`} className="stories-collection-link">
                                        <div className="stories-collection-image">
                                            <div className="stories-collection-image-placeholder">
                                                {blog.imageUrl ? (
                                                    <img 
                                                        src={blog.imageUrl}
                                                        alt={blog.title}
                                                        className="stories-collection-image"
                                                    />
                                                ) : (
                                                    <div className="stories-collection-placeholder-icon">
                                                        <StoryIcon />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="stories-collection-category-badge">
                                                {blog.categories?.[0] || 'Story'}
                                            </div>
                                        </div>
                                        <div className="stories-collection-card-content">
                                            <div className="stories-collection-meta">
                                                <span className="stories-collection-reading-time">5 min read</span>
                                                <span className="stories-collection-publish-date">
                                                    {formatDate(blog.timestamp || blog.id)}
                                                </span>
                                            </div>
                                            <h3 className="stories-collection-card-title">{blog.title}</h3>
                                            <p className="stories-collection-excerpt">
                                                {blog.body && blog.body.length > 100 
                                                    ? `${blog.body.substring(0, 100).replace(/<br\s*\/?>/g, ' ')}...`
                                                    : blog.body?.replace(/<br\s*\/?>/g, ' ')
                                                }
                                            </p>
                                            <div className="stories-collection-card-footer">
                                                <span className="stories-collection-author">By {blog.author}</span>
                                                <div className="stories-collection-tags">
                                                    {blog.categories?.slice(0, 2).map((category, index) => (
                                                        <span key={index} className="stories-collection-tag">
                                                            {category}
                                                        </span>
                                                    ))}
                                                    {blog.categories && blog.categories.length > 2 && (
                                                        <span className="stories-collection-tag stories-collection-tag-more">
                                                            +{blog.categories.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {!isPending && !error && filteredBlogs.length === 0 && (
                    <div className="stories-collection-empty">
                        <div className="stories-collection-empty-content">
                            <EmptyIcon />
                            <div className="stories-collection-empty-text">
                                <h3>No Stories Found</h3>
                                <p>
                                    {searchQuery || selectedCategory !== 'all' 
                                        ? "Try adjusting your search or filters to find more stories."
                                        : "No stories available yet. Check back soon for new content!"
                                    }
                                </p>
                            </div>
                            {(searchQuery || selectedCategory !== 'all') && (
                                <button onClick={clearFilters} className="collection-btn-primary">
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default AllStories;