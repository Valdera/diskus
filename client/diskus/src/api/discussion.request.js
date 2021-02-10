import axios from 'axios';
import { Config } from './config';

const url = Config.URL;

export const getAllDiscussions = async ({
  page,
  sort,
  limit,
  categories,
  search
}) => {
  const categoriesSelected = categories.toString();
  let discussions;
  if (search) {
    discussions = await axios.post(
      `${url}/api/discussions/search/?categories=${categoriesSelected}&limit=${limit}&page=${page}&sort=${sort}`,
      {
        text: search
      }
    );
    return discussions.data.data.results;
  } else {
    discussions = await axios.get(
      `${url}/api/discussions/?categories=${categoriesSelected}&limit=${limit}&page=${page}&sort=${sort}`
    );
    return discussions.data.data.data;
  }
};

export const getDiscussionById = async (id) => {
  const discussion = await axios.get(`${url}/api/discussions/${id}`);
  return discussion.data.data.data;
};

export const createDiscussion = async ({ jwt, discussionData }) => {
  const data = await axios.post(`${url}/api/discussions`, discussionData, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return data;
};
