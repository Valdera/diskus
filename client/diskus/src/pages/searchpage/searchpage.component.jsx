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

const SearchPage = ({
  fetchDiscussionsStart,
  discussions,
  isLoaded,
  match
}) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('Vote');
  const [categories, setCategories] = useState([]);

  const fetchDiscussions = async () => {
    let categoriesSelected;
    if (categories.length === 0) {
      categoriesSelected = ['Others'];
    } else {
      categoriesSelected = categories;
    }
    const limit = 10;
    const search = match.params.search;
    await fetchDiscussionsStart({
      categories: categoriesSelected,
      page,
      limit,
      sort,
      search
    });
  };

  useEffect(() => {
    fetchDiscussions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshDiscussion = async () => {
    await fetchDiscussions();
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
