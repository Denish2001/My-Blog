import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './CSS/bloglist.css';

const BlogList = ({blogs, title}) => {
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown date';
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderCategories = (categories) => {
        if (!categories || categories.length === 0) {
            return <span className="category-tag uncategorized">Uncategorized</span>;
        }

        return categories.slice(0, 3).map((category, index) => (
            <span key={index} className="category-tag">
                {category}
            </span>
        ));
    };

    return ( 
        <div className="blog-list-container">
            <h2 className="section-titles">{title}</h2>
            
            {blogs.length === 0 ? (
                <div className="no-blogs-message">
                    <div className="empty-state-icon">📝</div>
                    <h3>No stories yet</h3>
                    <p>Be the first to share your thoughts and experiences</p>
                    <Link to="/create" className="btn-create">
                        Write Your First Story
                    </Link>
                </div>
            ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <article className="blog-card" key={blog.id}>
                            <Link to={`/blogs/${blog.id}`} className="blog-link">
                                {/* Gestalt: Figure/Ground - Clear visual hierarchy with image */}
                                <div className="blog-image-container">
                                    <div className="blog-image-placeholder">
                                        {blog.imageUrl ? (
                                            <img 
                                                src={blog.imageUrl} 
                                                alt={blog.title}
                                                className="blog-image"
                                            />
                                        ) : (
                                            <div className="image-fallback">
                                                <span className="fallback-icon">📷</span>
                                                <span>No Image</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="blog-card-content">
                                    {/* Gestalt: Proximity - Content grouped logically */}
                                    <div className="content-group">
                                        {/* Don Norman: Constraints - Limited title length */}
                                        <h3 className="blogs-title">{blog.title}</h3>
                                        
                                        <div className="blog-meta">
                                            <span className="author">By {blog.author}</span>
                                            <span className="meta-separator">•</span>
                                            <span className="publish-date">
                                                {formatDate(blog.timestamp || blog.id)}
                                            </span>
                                        </div>

                                        {/* Gestalt: Closure - Complete thought in excerpt */}
                                        <div className="blog-excerpt">
                                            {blog.body && blog.body.length > 120 
                                                ? `${blog.body.substring(0, 120).replace(/<br\s*\/?>/g, ' ')}...`
                                                : blog.body?.replace(/<br\s*\/?>/g, ' ')
                                            }
                                        </div>
                                    </div>

                                    {/* Gestalt: Similarity - Consistent category styling */}
                                    <div className="blog-categories">
                                        {renderCategories(blog.categories)}
                                        {blog.categories && blog.categories.length > 3 && (
                                            <span className="category-tag more">+{blog.categories.length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Don Norman: Affordance & Signifiers - Clear interactive state */}
                                <div className="blog-card-overlay">
                                    <span className="read-more">Read Story →</span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default BlogList;