import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Create from './components/Create/Create.jsx';
import Team from './components/Team/Team.jsx';
import BlogDetails from './components/BlogDetails/BlogDetails.jsx';
import NotFound from './NotFound.jsx';
import Contact from './components/Contact/Contact.jsx';
import About from './components/About/About.jsx';
import EditBlog from './components/EditBlog/EditBlog.jsx';
import Footer from './components/Footer/Footer.jsx';
import AllStories from './components/AllStories/AllStories.jsx';
import Login from './components/Login/Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import Magazine from './components/Magazine/Magazine.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <Create />
                </ProtectedRoute>
              }
            />

            <Route path="/blogs/:id" element={<BlogDetails />} />

            <Route path="/team" element={<Team />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/about" element={<About />} />

            <Route path="/AllStories" element={<AllStories />} />
            <Route path="/Magazine" element={<Magazine />} />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
