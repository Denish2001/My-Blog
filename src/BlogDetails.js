import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './CSS/blogdetails.css'

const BlogDetails = () => {
  const history = useHistory()
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  
  useEffect(() => {
    loadBlog()
  }, [id])

  const loadBlog = async () => {
    try {
      setIsPending(true)
      const response = await fetch(`http://localhost:3001/blogs/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog not found')
        }
        throw new Error('Failed to load blog')
      }

      const blogData = await response.json()
      setBlog(blogData)
      setError(null)
    } catch (err) {
      console.error('Error loading blog:', err)
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }
  
  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    try {
      setDeletePending(true)
      const response = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete blog')
      }

      console.log("Blog deleted successfully")
      history.push('/')
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert('Error deleting blog. Please try again.')
      setShowDeleteConfirm(false)
    } finally {
      setDeletePending(false)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  const handleEdit = () => {
    history.push(`/edit/${id}`)
  }

  // Function to safely render HTML content from the blog body
  const renderBlogBody = (body) => {
    if (typeof body === 'string' && body.includes('<br>')) {
      return <div dangerouslySetInnerHTML={{ __html: body }} />
    }
    return <div style={{whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>{body}</div>
  }

  // Everyday object icons
  const Icons = {
    Edit: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.3639 3.65194L15.6568 2.35905C16.0474 1.96852 16.6805 1.96852 17.0711 2.35905L17.9497 3.23768C18.3403 3.6282 18.3403 4.26137 17.9497 4.65189L16.6568 5.94478M14.3639 3.65194L4.74742 13.2684C4.55889 13.4569 4.45359 13.7135 4.45547 13.9809L4.464 15.3925C4.46588 15.7874 4.78659 16.1081 5.18147 16.11L6.59305 16.1185C6.86042 16.1204 7.11705 16.0151 7.30558 15.8266L16.9221 6.21009C17.3126 5.81957 17.3126 5.1864 16.9221 4.79588L16.0435 3.91725C15.6529 3.52672 15.0198 3.52672 14.6292 3.91725L14.3639 3.65194Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 5L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 17H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Delete: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 7H15V15C15 16.1046 14.1046 17 13 17H7C5.89543 17 5 16.1046 5 15V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V4C8 3.44772 8.44772 3 9 3H11C11.5523 3 12 3.44772 12 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 10V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 10V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Warning: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9V13M12 17H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Loading: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Home: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10L10 3L17 10M5.5 9.5V16.5C5.5 17.0523 5.94772 17.5 6.5 17.5H9.5V13.5C9.5 12.9477 9.94772 12.5 10.5 12.5H11.5C12.0523 12.5 12.5 12.9477 12.5 13.5V17.5H15.5C16.0523 17.5 16.5 17.0523 16.5 16.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Calendar: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 6H14" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M11 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="4" y="8" width="1" height="1" rx="0.5" fill="currentColor"/>
        <rect x="7" y="8" width="1" height="1" rx="0.5" fill="currentColor"/>
        <rect x="10" y="8" width="1" height="1" rx="0.5" fill="currentColor"/>
        <rect x="4" y="11" width="1" height="1" rx="0.5" fill="currentColor"/>
        <rect x="7" y="11" width="1" height="1" rx="0.5" fill="currentColor"/>
        <rect x="10" y="11" width="1" height="1" rx="0.5" fill="currentColor"/>
      </svg>
    ),
    User: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M13 15C13 11.6863 10.7614 9 8 9C5.23858 9 3 11.6863 3 15" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    )
  }

  return (
    <div className='blog-details-container'>
      {isPending && (
        <div className="blog-details-loading">
          <div className="blog-details-loading-spinner">
            <Icons.Loading />
          </div>
          <p className="blog-details-loading-text">Loading story...</p>
        </div>
      )}
      
      {error && (
        <div className="blog-details-error">
          <div className="blog-details-error-icon">
            <Icons.Warning />
          </div>
          <div className="blog-details-error-content">
            <h3 className="blog-details-error-title">Oops! Something went wrong</h3>
            <p className="blog-details-error-message">{error}</p>
          </div>
          <button 
            onClick={() => history.push('/')}
            className="blog-details-btn-primary"
          >
            <Icons.Home />
            Back to Home
          </button>
        </div>
      )}
      
      {blog && (
        <article className="blog-details-article">
          {/* Blog Image */}
          {blog.imageUrl && (
            <div className="blog-details-image">
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="blog-details-image-content"
              />
            </div>
          )}

          <div className="blog-details-header">
            <div className="blog-details-meta">
              <span className="blog-details-author">
                <Icons.User />
                By {blog.author}
              </span>
              <span className="blog-details-separator">•</span>
              <span className="blog-details-date">
                <Icons.Calendar />
                {blog.date || new Date(blog.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <h1 className="blog-details-title">{blog.title}</h1>

            {(blog.categories && blog.categories.length > 0) && (
              <div className="blog-details-categories">
                {blog.categories.map(category => (
                  <span key={category} className="blog-details-category-tag">
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="blog-details-content">
            {renderBlogBody(blog.body)}
          </div>

          {(blog.tags && blog.tags.length > 0) && (
            <div className="blog-details-tags">
              <strong className="blog-details-tags-label">Tags: </strong>
              <div className="blog-details-tags-list">
                {blog.tags.map(tag => (
                  <span key={tag} className="blog-details-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="blog-details-actions">
            <button 
              onClick={handleEdit}
              className="blog-details-btn-edit"
            >
              <Icons.Edit />
              Edit Story
            </button>
            
            <button 
              onClick={handleDelete}
              className="blog-details-btn-delete"
              disabled={deletePending}
            >
              <Icons.Delete />
              {deletePending ? 'Deleting...' : 'Delete Story'}
            </button>
          </div>
        </article>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="blog-details-modal-overlay">
          <div className="blog-details-modal-content">
            <div className="blog-details-modal-header">
              <div className="blog-details-modal-icon">
                <Icons.Warning />
              </div>
              <h3 className="blog-details-modal-title">Confirm Deletion</h3>
            </div>
            <div className="blog-details-modal-body">
              <p className="blog-details-modal-text">
                Are you sure you want to delete "<strong>{blog?.title}</strong>"?
              </p>
              <p className="blog-details-modal-warning">
                This action cannot be undone.
              </p>
            </div>
            <div className="blog-details-modal-actions">
              <button 
                onClick={cancelDelete}
                className="blog-details-modal-btn-cancel"
                disabled={deletePending}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="blog-details-modal-btn-delete"
                disabled={deletePending}
              >
                {deletePending ? (
                  <>
                    <div className="blog-details-modal-spinner"></div>
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetails