import React from 'react';
import Filter from '../../components/filter/filter.component';
import Post from '../../components/post/post.component';
import './timelinepage.styles.scss';

const TimelinePage = () => {
  return (
    <div className="timelinepage">
      <div className="timelinepage__filter">
        <Filter />
      </div>
      <div className="timelinepage__post">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default TimelinePage;
