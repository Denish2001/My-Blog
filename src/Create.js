import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './CSS/create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Denish Awajo');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [pending, setIspending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const availableCategories = [
    'Crime', 'Tragedy', 'Politics', 'Science', 'Technology', 'Sport', 'International',
    'Business', 'Entertainment', 'History', 'Health', 'Human Interest', 'Education', 'Other'
  ];

  // Everyday object icons
  const Icons = {
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
    Publish: () => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1V10M10 10L13 7M10 10L7 7M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    )
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (categories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    let imageUrl = '';
    
    // Handle image upload
    if (image) {
      // In a real application, you would upload to a server
      // For now, we'll simulate by generating a unique filename
      const timestamp = Date.now();
      const fileName = `blog-${timestamp}-${image.name}`;
      imageUrl = `/images/${fileName}`;
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const blog = { 
      id: Date.now().toString(),
      title, 
      body: body.replace(/\n/g, '<br>'),
      author,
      date: formattedDate,
      timestamp: new Date(date).getTime(),
      categories,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: imageUrl || null
    };
    
    setIspending(true);

    try {
      // Send POST request to JSON Server
      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog');
      }

      const savedBlog = await response.json();
      console.log("New blog saved to database:", savedBlog);
      setIspending(false);
      history.push('/');
    } catch (error) {
      console.error("Error saving blog:", error);
      setError('Failed to save blog. Please try again.');
      setIspending(false);
    }
  };

  return (
    <div className='create-container'>
      <div className="create-header">
        <h1 className="create-title">Write a New Story</h1>
        <p className="create-subtitle">Share your thoughts and experiences with our community</p>
        {error && <div className="create-error">{error}</div>}
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="create-form-grid">
          {/* Image Upload Section */}
          <div className="create-form-group create-full-width">
            <label className="create-form-label">Story Image</label>
            <div className="create-image-upload">
              <div className="create-image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="create-preview-image" />
                ) : (
                  <div className="create-image-placeholder">
                    <span className="create-placeholder-icon">
                      <Icons.Camera />
                    </span>
                    <span className="create-placeholder-text">No image selected</span>
                  </div>
                )}
              </div>
              <div className="create-upload-controls">
                <input 
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="create-file-input"
                />
                <label htmlFor="image-upload" className="create-upload-btn">
                  <Icons.Upload />
                  Choose Image
                </label>
                {image && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setImage(null);
                      setImagePreview('');
                    }}
                    className="create-remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
              <small className="create-form-help">Recommended: 1200x630px, max 5MB</small>
            </div>
          </div>

          {/* Title */}
          <div className="create-form-group create-full-width">
            <label className="create-form-label">Story Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="create-form-input"
              placeholder="Enter an engaging title that captures attention..."
            />
          </div>

          {/* Date and Author */}
          <div className="create-form-group">
            <label className="create-form-label">Publish Date</label>
            <div className="create-input-with-icon">
              <Icons.Calendar />
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="create-form-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="create-form-group">
            <label className="create-form-label">Author</label>
            <div className="create-input-with-icon">
              <Icons.User />
              <select 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="create-form-select"
              >
                <option value="Denish Awajo">Denish Awajo</option>
                <option value="Patrick Mugure">Patrick Mugure</option>
                <option value="Ejidio Maina">Ejidio Maina</option>
                <option value="George Mwangi">George Mwangi</option>
                <option value="Vyonnah Nyambura">Vyonnah Nyambura</option>
                <option value="Skeeter Imisa">Skeeter Imisa</option>
                <option value="Bridgette Muthoni">Bridgette Muthoni</option>
                <option value="Ronny Choge">Ronny Choge</option>
                <option value="Nicholas Waite">Nicholas Waite</option>
                <option value="Sylvia Menya">Sylvia Menya</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="create-form-group create-full-width">
            <label className="create-form-label">Story Content</label>
            <textarea 
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="12"
              className="create-form-textarea"
              placeholder="Tell your story...

Tips:
- Press Enter twice for paragraph breaks
- Use single Enter for line breaks
- Your formatting will be preserved"
            ></textarea>
          </div>

          {/* Categories */}
          <div className="create-form-group create-full-width">
            <label className="create-form-label">
              Categories <span className="create-required">*</span>
            </label>
            <div className="create-categories-grid">
              {availableCategories.map(category => (
                <label key={category} className="create-category-card">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="create-category-input"
                  />
                  <div className="create-category-content">
                    <span className="create-category-name">{category}</span>
                    {categories.includes(category) && (
                      <span className="create-category-check">
                        <Icons.Check />
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <small className="create-form-help">Select at least one category</small>
          </div>

          {/* Tags */}
          <div className="create-form-group create-full-width">
            <label className="create-form-label">Tags</label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="create-form-input"
              placeholder="Enter tags separated by commas (e.g., mystery, adventure, romance)"
            />
            <small className="create-form-help">Optional: Add tags to help readers discover your story</small>
          </div>
        </div>

        <div className="create-form-actions">
          <button 
            type="button" 
            onClick={() => history.push('/')}
            className="create-btn-cancel"
            disabled={pending}
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            className={`create-btn-submit ${pending ? 'create-submitting' : ''}`}
            disabled={pending}
          >
            {pending ? (
              <>
                <div className="create-btn-spinner"></div>
                <span className="create-btn-text">Publishing Story...</span>
              </>
            ) : (
              <>
                <Icons.Publish />
                <span className="create-btn-text">Publish Story</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;