// utils/blogData.js
import db from '../Data/db.json';

export const getAllBlogs = () => {
  try {
    const localStorageBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const allBlogs = [...localStorageBlogs, ...db.blogs];
    
    // Remove duplicates
    return allBlogs.filter((blog, index, self) => 
      index === self.findIndex(b => b.id === blog.id)
    );
  } catch (error) {
    console.error('Error loading blogs:', error);
    return db.blogs; // Fallback to just db.json
  }
};

export const getBlogById = (id) => {
  const allBlogs = getAllBlogs();
  return allBlogs.find(blog => blog.id === parseInt(id));
};

export const saveBlog = (blog) => {
  const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const updatedBlogs = [blog, ...existingBlogs];
  localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  return blog;
};

export const deleteBlog = (id) => {
  const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const updatedBlogs = existingBlogs.filter(blog => blog.id !== parseInt(id));
  localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
};