import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './CSS/edit.css';

const EditBlog = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Denish Awajo');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [pending, setIspending] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const history = useHistory();
  const { id } = useParams();

  const availableCategories = [
    'Crime', 'Tragedy', 'Politics', 'Science', 'Technology','Sport', 'International',
    'Business', 'Entertainment', 'History', 'Health', 'Human Interest', 'Education', 'Other'
  ];

  // Minimalist icons with pink accents
  const Icons = {
    Loading: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Camera: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7.8C2 6.11984 2 5.27976 2.32698 4.63803C2.6146 4.07354 3.07354 3.6146 3.63803 3.32698C4.27976 3 5.11984 3 6.8 3H7.47273C7.90614 3 8.12285 3 8.31905 2.94586C8.49211 2.89787 8.65504 2.82115 8.80056 2.71914C8.96613 2.60342 9.10053 2.43901 9.36933 2.11019L10.2757 0.987154C10.5237 0.684188 10.6477 0.532705 10.7896 0.484298C10.9138 0.442345 11.0487 0.442345 11.1729 0.484298C11.3148 0.532705 11.4388 0.684188 11.6868 0.987154L12.5932 2.11019C12.862 2.43901 12.9964 2.60342 13.1619 2.71914C13.3075 2.82115 13.4704 2.89787 13.6435 2.94586C13.8397 3 14.0564 3 14.4898 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V14.2C20 15.8802 20 16.7202 19.673 17.362C19.3854 17.9265 18.9265 18.3854 18.362 18.673C17.7202 19 16.8802 19 15.2 19H6.8C5.11984 19 4.27976 19 3.63803 18.673C3.07354 18.3854 2.6146 17.9265 2.32698 17.362C2 16.7202 2 15.8802 2 14.2V7.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Upload: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.33398 6.66699L8.00065 4.00033L10.6673 6.66699" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 4V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Save: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 5V13.8C17 14.9201 17 15.4802 16.782 15.908C16.5903 16.2843 16.2843 16.5903 15.908 16.782C15.4802 17 14.9201 17 13.8 17H6.2C5.0799 17 4.51984 17 4.09202 16.782C3.71569 16.5903 3.40973 16.2843 3.21799 15.908C3 15.4802 3 14.9201 3 13.8V6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.07989 3 6.2 3H13M17 5L13.5 1.5M17 5L13 9M10 9.5C9.07174 9.5 8.60761 9.5 8.21593 9.66349C7.86063 9.8113 7.5613 10.1106 7.41349 10.4659C7.25 10.8576 7.25 11.3217 7.25 12.25C7.25 13.1783 7.25 13.6424 7.41349 14.0341C7.5613 14.3894 7.86063 14.6887 8.21593 14.8365C8.60761 15 9.07174 15 10 15C10.9283 15 11.3924 15 11.7841 14.8365C12.1394 14.6887 12.4387 14.3894 12.5865 14.0341C12.75 13.6424 12.75 13.1783 12.75 12.25C12.75 11.3217 12.75 10.8576 12.5865 10.4659C12.4387 10.1106 12.1394 9.8113 11.7841 9.66349C11.3924 9.5 10.9283 9.5 10 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Calendar: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 6H14" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M11 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    User: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M13 15C13 11.6863 10.7614 9 8 9C5.23858 9 3 11.6863 3 15" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    Check: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Back: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 10H5M5 10L8.33333 6.66667M5 10L8.33333 13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const response = await fetch(`http://localhost:3001/blogs/${id}`);
      
      if (!response.ok) {
        throw new Error('Blog not found');
      }

      const blogToEdit = await response.json();
      
      setTitle(blogToEdit.title);
      setBody(blogToEdit.body.replace(/<br\s*\/?>/g, '\n'));
      setAuthor(blogToEdit.author);
      setCategories(blogToEdit.categories || []);
      setTags(blogToEdit.tags ? blogToEdit.tags.join(', ') : '');
      setExistingImageUrl(blogToEdit.imageUrl || '');
      
      if (blogToEdit.timestamp) {
        setDate(new Date(blogToEdit.timestamp).toISOString().split('T')[0]);
      } else {
        setDate(new Date().toISOString().split('T')[0]);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading blog:', err);
      setError('Failed to load story for editing');
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (category) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImage(file);
      setExistingImageUrl('');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
    setExistingImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (categories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    let imageUrl = existingImageUrl;
    
    if (image) {
      const timestamp = Date.now();
      const fileName = `blog-${timestamp}-${image.name}`;
      imageUrl = `/images/${fileName}`;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const updatedBlog = { 
      id: id,
      title, 
      body: body.replace(/\n/g, '<br>'),
      author,
      categories,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: formattedDate,
      timestamp: new Date(date).getTime(),
      imageUrl: imageUrl || null
    };
    
    setIspending(true);

    try {
      const response = await fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      const savedBlog = await response.json();
      console.log("Story updated:", savedBlog);
      setIspending(false);
      history.push(`/blogs/${id}`);
    } catch (error) {
      console.error("Error updating story:", error);
      setError('Failed to update story. Please try again.');
      setIspending(false);
    }
  };

  const handleCancel = () => {
    history.push(`/blogs/${id}`);
  };

  if (isLoading) {
    return (
      <div className='edit-container'>
        <div className="edit-loading-state">
          <div className="edit-loading-spinner">
            <Icons.Loading />
          </div>
          <p className="edit-loading-text">Loading story for editing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='edit-container'>
      {/* Header with back navigation */}
      <div className="edit-navigation">
        <button onClick={handleCancel} className="edit-back-btn">
          <Icons.Back />
          Back to Story
        </button>
      </div>

      <div className="edit-header">
        <h1 className="edit-title">Edit Story</h1>
        <p className="edit-subtitle">Refine your narrative with precision and care</p>
        {error && <div className="edit-error">{error}</div>}
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-form-grid">
          {/* Image Upload Section */}
          <div className="edit-form-group edit-full-width">
            <label className="edit-form-label">Visual Narrative</label>
            <div className="edit-image-upload">
              <div className="edit-image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="edit-preview-image" />
                ) : existingImageUrl ? (
                  <img src={existingImageUrl} alt="Current" className="edit-preview-image" />
                ) : (
                  <div className="edit-image-placeholder">
                    <span className="edit-placeholder-icon">
                      <Icons.Camera />
                    </span>
                    <span className="edit-placeholder-text">No image selected</span>
                  </div>
                )}
              </div>
              <div className="edit-upload-controls">
                <input 
                  type="file"
                  id="edit-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="edit-file-input"
                />
                <label htmlFor="edit-image-upload" className="edit-upload-btn">
                  <Icons.Upload />
                  {existingImageUrl ? 'Change Image' : 'Choose Image'}
                </label>
                {(image || existingImageUrl) && (
                  <button 
                    type="button" 
                    onClick={handleRemoveImage}
                    className="edit-remove-btn"
                  >
                    Remove Image
                  </button>
                )}
              </div>
              <small className="edit-form-help">Recommended: 1200x630px, max 5MB</small>
            </div>
          </div>

          {/* Title */}
          <div className="edit-form-group edit-full-width">
            <label className="edit-form-label">Story Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-form-input"
              placeholder="Craft a compelling title that captures attention..."
            />
          </div>

          {/* Date and Author */}
          <div className="edit-form-group">
            <label className="edit-form-label">Publication Date</label>
            <div className="edit-input-with-icon">
              <Icons.Calendar />
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="edit-form-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label">Author</label>
            <div className="edit-input-with-icon">
              <Icons.User />
              <select 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="edit-form-select"
              >
                <option value="Denish Awajo">Denish Awajo</option>
                <option value="Patrick Mugure">Patrick Mugure</option>
                <option value="Ejidio Maina">Ejidio Maina</option>
                <option value="George Mwangi">George Mwangi</option>
                <option value="Vyonnah Nyambura">Vyonnah Nyambura</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="edit-form-group edit-full-width">
            <label className="edit-form-label">Story Content</label>
            <textarea 
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="12"
              className="edit-form-textarea"
              placeholder="Weave your narrative tapestry here..."
            ></textarea>
          </div>

          {/* Categories */}
          <div className="edit-form-group edit-full-width">
            <label className="edit-form-label">
              Categories <span className="edit-required">*</span>
            </label>
            <div className="edit-categories-grid">
              {availableCategories.map(category => (
                <label key={category} className="edit-category-card">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="edit-category-input"
                  />
                  <div className="edit-category-content">
                    <span className="edit-category-name">{category}</span>
                    {categories.includes(category) && (
                      <span className="edit-category-check">
                        <Icons.Check />
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <small className="edit-form-help">Select at least one category to help readers find your story</small>
          </div>

          {/* Tags */}
          <div className="edit-form-group edit-full-width">
            <label className="edit-form-label">Story Tags</label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="edit-form-input"
              placeholder="Add descriptive tags separated by commas..."
            />
            <small className="edit-form-help">Optional: Enhance discoverability with relevant tags</small>
          </div>
        </div>

        <div className="edit-form-actions">
          <button 
            type="button" 
            onClick={handleCancel}
            className="edit-btn-cancel"
            disabled={pending}
          >
            Discard Changes
          </button>
          
          <button 
            type="submit" 
            className={`edit-btn-submit ${pending ? 'edit-submitting' : ''}`}
            disabled={pending}
          >
            {pending ? (
              <>
                <div className="edit-btn-spinner"></div>
                <span className="edit-btn-text">Saving Changes...</span>
              </>
            ) : (
              <>
                <Icons.Save />
                <span className="edit-btn-text">Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;