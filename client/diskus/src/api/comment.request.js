import axios from 'axios';
import { Config } from './config';

const url = Config.URL;

export const createComment = async ({ jwt, data }) => {
  let result = await axios.post(`${url}/api/comments/`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  return result.data.data.data;
};

export const deleteComment = async ({ jwt, id }) => {
  const data = await axios.delete(`${url}/api/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return data;
};
