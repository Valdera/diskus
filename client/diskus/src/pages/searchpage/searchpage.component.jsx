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
import './searchpage.styles.scss';

const limit = 10;

const SearchPage = ({
  fetchDiscussionsStart,
  discussions,
  isLoaded,
  match
}) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-createdAt');
  const [categories, setCategories] = useState([]);

  const fetchDiscussions = async (sort, currpage = page) => {
    let categoriesSelected;
    // if (categories.length === 0) {
    //   categoriesSelected = ['Others'];
    // } else {
    categoriesSelected = categories;
    // }
    const search = match.params.search;
    await fetchDiscussionsStart({
      categories: categoriesSelected,
      page: currpage,
      limit,
      sort,
      search
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
    <div className="searchpage">
      <div className="searchpage__filter">
        <Filter
          refreshDiscussion={refreshDiscussion}
          sort={sort}
          setSort={setSort}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      {isLoaded && discussions ? (
        <div className="searchpage__post">
          {discussions.map((discussion) => (
            <Post
              discussion={discussion}
              key={discussion.id}
              clickableVote={false}
            />
          ))}
          <div className="searchpage__page">
            <i
              className={`fas fa-chevron-circle-left ${
                page === 1 ? 'searchpage__page--hidden' : ''
              }`}
              onClick={() => changePage('previous')}></i>
            {discussions.length > 0 ? <span>{page}</span> : ''}
            <i
              className={`fas fa-chevron-circle-right ${
                discussions.length < limit ? 'searchpage__page--hidden' : ''
              }`}
              onClick={() => changePage('next')}></i>
          </div>
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
