import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Filter from '../../components/filter/filter.component';
import Post from '../../components/post/post.component';
import { fetchDiscussionsStart } from '../../redux/discussion/discussion.actions';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectDiscussions,
  selectDiscussionsLoaded
} from '../../redux/discussion/discussion.selector';
import './searchpage.styles.scss';

const SearchPage = ({
  fetchDiscussionsStart,
  discussions,
  isLoaded,
  match
}) => {
  useEffect(() => {
    async function fetchDiscussions() {
      const categories = ['Others'];
      const page = 1;
      const limit = 10;
      const sort = 'Vote';
      const search = match.params.search;
      await fetchDiscussionsStart({
        categories,
        page,
        limit,
        sort,
        search
      });
    }
    fetchDiscussions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="searchpage">
      <div className="searchpage__filter">
        <Filter />
      </div>
      {isLoaded && discussions ? (
        <div className="searchpage__post">
          {discussions.map((discussion) => (
            <Post discussion={discussion} key={discussion.id} />
          ))}
        </div>
      ) : (
        <div className="searchpage__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchDiscussionsStart: (payload) => dispatch(fetchDiscussionsStart(payload))
});

const mapStateToProps = createStructuredSelector({
  isLoaded: (state) => !selectDiscussionsLoaded(state),
  discussions: selectDiscussions
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
