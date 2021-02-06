import React from 'react';
import Filter from '../../components/filter/filter.component';
import Post from '../../components/post/post.component';
import './searchpage.styles.scss';

const SearchPage = () => {
  return (
    <div className="searchpage">
      <div className="searchpage__filter">
        <Filter />
      </div>
      <div className="searchpage__post">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default SearchPage;
