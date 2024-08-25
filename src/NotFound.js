import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NotFound = () => {
  return (
    <div className="not-found">
        <h2>Sorry</h2>
        <p>that page cannot be found</p>
        <Link to="/">Back to Home Page</Link>
    </div>
  )
}

export default NotFound