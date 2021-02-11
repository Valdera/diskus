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
