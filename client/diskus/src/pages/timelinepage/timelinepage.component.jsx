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
import './timelinepage.styles.scss';

const TimelinePage = ({ fetchDiscussionsStart, discussions, isLoaded }) => {
  useEffect(() => {
    async function fetchDiscussions() {
      const categories = ['Others'];
      const page = 1;
      const limit = 10;
      const sort = 'Vote';
      await fetchDiscussionsStart({
        categories,
        page,
        limit,
        sort
      });
    }
    fetchDiscussions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="timelinepage">
      <div className="timelinepage__filter">
        <Filter />
      </div>
      {isLoaded && discussions ? (
        <div className="timelinepage__post">
          {discussions.map((discussion) => (
            <Post discussion={discussion} key={discussion.id} />
          ))}
        </div>
      ) : (
        <div className="timelinepage__spinner">
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

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePage);
