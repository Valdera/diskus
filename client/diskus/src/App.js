import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import Navbar from './components/navbar/navbar.component';
import React, { useEffect } from 'react';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profilepage/profilepage.component';
import TimelinePage from './pages/timelinepage/timelinepage.component';
import SearchPage from './pages/searchpage/searchpage.component';
import BioPage from './pages/biopage/biopage.component';
import LoginPage from './pages/loginpage/loginpage.component';
import DiscussionPage from './pages/discussionpage/discussionpage.component';
import { cleanErrorUser, removeCurrentUser } from './redux/auth/auth.actions';
import Cookies from 'universal-cookie';
import { selectErrorDiscussion } from './redux/discussion/discussion.selector';
import { selectErrorUser } from './redux/auth/auth.selector';
import { selectErrorComment } from './redux/comment/comment.selector';
import { cleanErrorDiscussion } from './redux/discussion/discussion.actions';
import { cleanErrorComment } from './redux/comment/comment.actions';

const App = ({
  currentUser,
  removeCurrentUser,
  userError,
  commentError,
  discussionError,
  cleanErrorComment,
  cleanErrorDiscussion,
  cleanErrorUser
}) => {
  const checkUser = async () => {
    const cookies = new Cookies();
    cookies.get('jwt', { path: '/' });
    if (!cookies.cookies.jwt) {
      await removeCurrentUser('test');
    }
  };

  useEffect(() => {
    checkUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            currentUser ? <Redirect to="/timeline" /> : <HomePage />
          }
        />
        <Route
          exact
          path="/profile"
          render={() =>
            !currentUser ? <Redirect to="/login" /> : <ProfilePage />
          }
        />
        <Route exact path="/timeline" component={TimelinePage} />
        <Route exact path="/search/:search" component={SearchPage} />
        <Route exact path="/bio/:id" component={BioPage} />
        <Route
          exact
          path="/login"
          render={() =>
            currentUser ? <Redirect to="/timeline" /> : <LoginPage />
          }
        />
        <Route exact path="/discussion/:id" component={DiscussionPage} />
      </Switch>
      {userError && userError.response ? (
        <div className="app-error">
          <i className="fas fa-exclamation-triangle app-error__icon"></i>
          <div className="app-error__content">
            <p className="app-error__code">
              {userError.response.data.error.statusCode}
            </p>
            <p className="app-error__text">{userError.response.data.message}</p>
          </div>

          <button
            className="app-error__button"
            onClick={() => {
              cleanErrorUser();
            }}>
            OK
          </button>
        </div>
      ) : (
        ''
      )}
      {discussionError && discussionError.response ? (
        <div className="app-error">
          <i className="fas fa-exclamation-triangle app-error__icon"></i>
          <div className="app-error__content">
            <p className="app-error__code">
              {discussionError.response.data.error.statusCode}
            </p>
            <p className="app-error__text">
              {discussionError.response.data.message}
            </p>
          </div>

          <button
            className="app-error__button"
            onClick={() => cleanErrorDiscussion()}>
            OK
          </button>
        </div>
      ) : (
        ''
      )}
      {commentError && commentError.response ? (
        <div className="app-error">
          <i className="fas fa-exclamation-triangle app-error__icon"></i>
          <div className="app-error__content">
            <p className="app-error__code">
              {commentError.response.data.error.statusCode}
            </p>
            <p className="app-error__text">
              {commentError.response.data.message}
            </p>
          </div>
          <button
            className="app-error__button"
            onClick={() => cleanErrorComment()}>
            OK
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userError: selectErrorUser,
  commentError: selectErrorComment,
  discussionError: selectErrorDiscussion
});

const mapDispatchToProps = (dispatch) => ({
  removeCurrentUser: () => dispatch(removeCurrentUser()),
  cleanErrorUser: () => dispatch(cleanErrorUser()),
  cleanErrorDiscussion: () => dispatch(cleanErrorDiscussion()),
  cleanErrorComment: () => dispatch(cleanErrorComment())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
