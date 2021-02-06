import React, { useState } from 'react';
import StyledSelectDrop from '../styled-select/styled-select.component';
import './filter.styles.scss';
import Submit from '../submit/submit.component';

const Filter = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openVote, setOpenVote] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);

  const setOpen = (name) => {
    if (name === 'categories') {
      setOpenDate(false);
      setOpenVote(false);
      setOpenSubmit(false);
      setOpenCategories(!openCategories);
    } else if (name === 'date') {
      setOpenCategories(false);
      setOpenVote(false);
      setOpenSubmit(false);
      setOpenDate(!openDate);
    } else if (name === 'vote') {
      setOpenDate(false);
      setOpenCategories(false);
      setOpenSubmit(false);
      setOpenVote(!openVote);
    } else if (name === 'submit') {
      setOpenDate(false);
      setOpenVote(false);
      setOpenCategories(false);
      setOpenSubmit(!openSubmit);
    }
  };

  return (
    <div className="filter">
      <div className="filter__submit" onClick={() => setOpen('submit')}>
        <i className="fas fa-plus-circle"></i>
        <p>Submit Post</p>
      </div>
      <div className="filter__button" onClick={() => setOpen('categories')}>
        <p>Categories</p>
        <i
          className={`fas fa-chevron-down ${
            openCategories ? 'filter__rotate' : ''
          }`}></i>
      </div>
      <div className="filter__button" onClick={() => setOpen('date')}>
        <p>Date</p>
        <i
          className={`fas fa-chevron-down ${
            openDate ? 'filter__rotate' : ''
          }`}></i>
      </div>
      <div className="filter__button" onClick={() => setOpen('vote')}>
        <p>Vote</p>
        <i
          className={`fas fa-chevron-down ${
            openVote ? 'filter__rotate' : ''
          }`}></i>
      </div>
      {openCategories ? (
        <div className="filter__categories">
          <StyledSelectDrop />
          <button>Search</button>
        </div>
      ) : (
        ''
      )}
      {openDate ? (
        <div className="filter__date">
          <button>Last day</button>
          <button>Last week</button>
          <button>Last month</button>
        </div>
      ) : (
        ''
      )}
      {openVote ? (
        <div className="filter__vote">
          <button>Last day</button>
          <button>Last week</button>
        </div>
      ) : (
        ''
      )}

      {openSubmit ? (
        <div className="filter__submit-post">
          <Submit />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Filter;
