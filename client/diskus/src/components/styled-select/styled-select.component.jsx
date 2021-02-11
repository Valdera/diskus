import React from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';
import Select from 'react-dropdown-select';

const StyledSelectDrop = ({ categories, setCategories }) => {
  //   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   const [open, setOpen] = useState(null);
  return (
    <StyledSelect
      multi
      options={[
        { id: '1', name: 'Technology' },
        { id: '2', name: 'Education' },
        { id: '3', name: 'Others' },
        { id: '4', name: 'Health' },
        { id: '5', name: 'News' },
        { id: '6', name: 'Entertainment' },
        { id: '7', name: 'Youth' },
        { id: '8', name: 'Event' },
        { id: '9', name: 'Story' },
        { id: '9', name: 'Sport' },
        { id: '9', name: 'Games' }
      ]}
      values={categories}
      onChange={(arr) => {
        let array = [];
        arr.forEach((item) => array.push(item.name));
        setCategories(array);
      }}
      color="#e5640c"
      searchBy="name"
      labelField="name"
      valueField="name"
    />
  );
};

const hide = keyframes`
  from {
    transition: height 310ms ease;
  }
  to {
    transition: height 310ms ease;
    height: 0;
    opacity: 0;
  }
`;

const show = keyframes`
  from {
    transition: height 310ms ease;
    height: 0;
    opacity: 0;
  }
  to {
    transition: height 310ms ease;
  }
`;

const StyledSelect = styled(Select)`
   {
    background: #fff;
    border: 2px solid rgba(47, 46, 65, 0.2);

    border-radius: 10px;
    font-size: 14px;
    transition: all 0.3s;

    :focus {
      font-size: 14px;
      border: 2px solid #e5640c;
      box-shadow: none;
    }

    :hover {
      border: 2px solid rgba(47, 46, 65, 0.2);
    }

    :focus-within {
      font-size: 14px;
      border: 2px solid #e5640c;

      box-shadow: none;
    }

    .react-dropdown-select-dropdown {
      position: absolute;
      left: 0;
      border: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      overflow: auto;
      z-index: 9;
      box-shadow: 0 2rem 2rem rgba(47, 46, 65, 0.2);
      height: 200px;
      ${({ isOpen }) =>
        isOpen
          ? css`
              animation: ${hide} 310ms ease-in-out;
            `
          : css`
              animation: ${show} 310ms ease-in-out;
            `};
    }

    .react-dropdown-select-option {
      transition: all 0.3s ease-out;
    }

    .react-dropdown-select-dropdown-handle {
      transition: all 0.3s;
    }
  }
`;

export default StyledSelectDrop;
