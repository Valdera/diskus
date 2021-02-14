import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  selectCurrentUser,
  selectIsLoadingUser,
  selectMessageUser
} from './redux/auth/auth.selector';
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
import ForgotPage from './pages/forgotpage/forgotpage.component';
import ErrorPage from './pages/errorpage/errorpage.component';
import Footer from './components/footer/footer.component';
import {
  cleanErrorUser,
  removeCurrentUser,
  cleanMessageUser
} from './redux/auth/auth.actions';
import Cookies from 'universal-cookie';
import {
  selectErrorDiscussion,
  selectIsLoadingDiscussion
} from './redux/discussion/discussion.selector';
import { selectErrorUser } from './redux/auth/auth.selector';
import {
  selectErrorComment,
  selectIsLoadingComment
} from './redux/comment/comment.selector';
import { cleanErrorDiscussion } from './redux/discussion/discussion.actions';
import { cleanErrorComment } from './redux/comment/comment.actions';
import DotLoad from './components/dotload/dotload.component';

const App = ({
  currentUser,
  removeCurrentUser,
  userError,
  commentError,
  discussionError,
  cleanErrorComment,
  cleanErrorDiscussion,
  cleanErrorUser,
  cleanUserMessage,
  userMessage,
  userLoading,
  commentLoading,
  discussionLoading
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
            currentUser ? (
              <Redirect to="/timeline" />
            ) : (
              <div>
                {' '}
                <LoginPage /> <Footer />
              </div>
            )
          }
        />
        <Route exact path="/discussion/:id" component={DiscussionPage} />
        <Route
          exact
          path="/forgot/:token"
          render={() =>
            currentUser ? <Redirect to="/timeline" /> : <ForgotPage />
          }
        />
        <Route
          path="/:errorid"
          render={() => <ErrorPage>Invalid Url</ErrorPage>}
        />
      </Switch>
      {userError && userError.response ? (
        <div className="app-error">
          <i className="fas fa-exclamation-triangle app-error__icon"></i>
          <div className="app-error__content">
            <p className="app-error__code">{userError.response.status}</p>
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
            <p className="app-error__code">{discussionError.response.status}</p>
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
            <p className="app-error__code">{commentError.response.status}</p>
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
      {userMessage ? (
        <div className="app-error">
          <i style={{ color: '#73D673' }} className="fas fa-check-circle"></i>
          <div className="app-error__content">
            <p className="app-error__text">{userMessage}</p>
          </div>
          <button
            className="app-error__button"
            onClick={() => cleanUserMessage()}>
            OK
          </button>
        </div>
      ) : (
        ''
      )}
      {userLoading || commentLoading || discussionLoading ? (
        <div className="app-dot">
          <DotLoad />
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
  discussionError: selectErrorDiscussion,
  userMessage: selectMessageUser,
  userLoading: selectIsLoadingUser,
  commentLoading: selectIsLoadingComment,
  discussionLoading: selectIsLoadingDiscussion
});

const mapDispatchToProps = (dispatch) => ({
  removeCurrentUser: () => dispatch(removeCurrentUser()),
  cleanErrorUser: () => dispatch(cleanErrorUser()),
  cleanErrorDiscussion: () => dispatch(cleanErrorDiscussion()),
  cleanErrorComment: () => dispatch(cleanErrorComment()),
  cleanUserMessage: () => dispatch(cleanMessageUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
