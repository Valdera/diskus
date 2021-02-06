import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profilepage/profilepage.component';
import TimelinePage from './pages/timelinepage/timelinepage.component';
import SearchPage from './pages/searchpage/searchpage.component';
import BioPage from './pages/biopage/biopage.component';
import LoginPage from './pages/loginpage/loginpage.component';
import DiscussionPage from './pages/discussionpage/discussionpage.component';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/timeline" component={TimelinePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/bio" component={BioPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/discussion" component={DiscussionPage} />
      </Switch>
    </div>
  );
};

export default App;
