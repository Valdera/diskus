import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import RadiusButton from '../../components/radius-button/radius-button.component';
import StyledSelectDrop from '../styled-select/styled-select.component';
import { createDiscussionStart } from '../../redux/discussion/discussion.actions';
import './submit.styles.scss';

const Submit = ({ currentUser, createDiscussionStart, setOpen }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState('');

  const handleSubmit = async () => {
    if (title || text) {
      const formdata = new FormData();
      const data = {};

      if (file) {
        formdata.append('file', file);
        data.formdata = formdata;
      }
      data.discussionData = {
        title,
        text,
        categories
      };
      await createDiscussionStart(data);

      setTitle('');
      setText('');
      setFile('');
      setCategories([]);

      if (setOpen) setOpen('submit');
    }
  };

  return (
    <div className="submit">
      <h1>Submit a Post</h1>
      <div className="submit__input">
        <p>Title :</p>
        <input
          className="submit__input-text"
          type="text"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </div>
      <div className="submit__input">
        <p>Type :</p>
        <StyledSelectDrop
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="submit__input">
        <p>Main Text :</p>
        <textarea value={text} onChange={(evt) => setText(evt.target.value)} />
      </div>
      <div className="submit__button">
        <div className="submit__inputfile">
          <button>Insert Image</button>
          <input
            type="file"
            onChange={(evt) => {
              setFile(evt.target.files[0]);
            }}
          />
        </div>
        {file ? <img src={URL.createObjectURL(file)} alt="file" /> : ''}
        <RadiusButton
          custom="flip-orange"
          onClick={() => {
            handleSubmit();
          }}>
          Submit
        </RadiusButton>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createDiscussionStart: (payload) => dispatch(createDiscussionStart(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
