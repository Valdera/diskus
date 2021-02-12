import React, { useEffect, useState } from 'react';
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

const limit = 10;

const TimelinePage = ({ fetchDiscussionsStart, discussions, isLoaded }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-createdDate');
  const [categories, setCategories] = useState([]);

  const fetchDiscussions = async (sort, currpage = page) => {
    await fetchDiscussionsStart({
      categories,
      page: currpage,
      limit,
      sort
    });
  };

  useEffect(() => {
    fetchDiscussions(sort);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changePage = async (type) => {
    if (type === 'next') {
      setPage(page + 1);
      fetchDiscussions(sort, page + 1);
    } else if (type === 'previous') {
      setPage(page - 1);
      fetchDiscussions(sort, page - 1);
    }
  };

  const refreshDiscussion = async (sort) => {
    await fetchDiscussions(sort);
  };

  return (
    <div className="timelinepage">
      <div className="timelinepage__filter">
        <Filter
          refreshDiscussion={refreshDiscussion}
          sort={sort}
          setSort={setSort}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      {isLoaded && discussions ? (
        <div className="timelinepage__post">
          {discussions.map((discussion) => (
            <Post
              discussion={discussion}
              key={discussion.id}
              clickableVote={false}
            />
          ))}
          <div className="timelinepage__page">
            <i
              className={`fas fa-chevron-circle-left ${
                page === 1 ? 'timelinepage__page--hidden' : ''
              }`}
              onClick={() => changePage('previous')}></i>
            {discussions.length > 0 ? <span>{page}</span> : ''}
            <i
              className={`fas fa-chevron-circle-right ${
                discussions.length < limit ? 'timelinepage__page--hidden' : ''
              }`}
              onClick={() => changePage('next')}></i>
          </div>
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
