// App.js
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import Team from './Team';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Contact from './Contact';
import About from './About';
import EditBlog from './EditBlog';
import Footer from './footer';
import AllStories from './AllStories';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import CustomCursor from './CustomCusor';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/create" component={Create} />
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/AllStories">
              <AllStories />
            </Route>
            <ProtectedRoute path="/edit/:id" component={EditBlog} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;