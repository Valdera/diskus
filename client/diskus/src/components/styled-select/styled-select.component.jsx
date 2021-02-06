import React from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';
import Select from 'react-dropdown-select';

const StyledSelectDrop = () => {
  //   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   const [open, setOpen] = useState(null);
  return (
    <StyledSelect
      multi
      //   isOpen={open}
      options={[
        { id: 'asdfa', name: 'test' },
        { id: 'dd', name: 'test' },
        { id: 'deeee', name: 'test' },
        { id: 'dee', name: 'test' },
        { id: 'ee', name: 'test' },
        { id: 'e', name: 'test' }
      ]}
      onChange={(value) => console.log(value)}
      //   onDropdownCloseRequest={({ close }) => {
      //     setOpen(true);
      // sleep(300).then(() => {
      //   close();
      //   setOpen(false);
      // });
      //   }}
      color="#e5640c"
      searchBy="name"
      labelField="name"
      valueField="id"
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
