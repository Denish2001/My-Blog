import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Denish Awajo');
  const [pending, setIspending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, body, author };
    setIspending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log("new blog added");
      setIspending(false);
      history.push('/');
    });
  };

  return (
    <div className='create'>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input 
          type="text" 
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog Body:</label>
        <textarea 
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
          cols="50"
          placeholder="Write your blog post here..."
        ></textarea>

        <label>Blog Author:</label>
        <select 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Denish Awajo">Denish Awajo</option>
          <option value="Guest">Guest</option>
          <option value="Wilhemina Slater">Wilhemina Slater</option>
        </select>

        { !pending && <button>Add Blog</button>}
        { pending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
