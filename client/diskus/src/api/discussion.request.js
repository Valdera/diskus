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
  let params =
    categories.length > 0
      ? `categories=${categoriesSelected}&limit=${limit}&page=${page}&sort=${sort}`
      : `limit=${limit}&page=${page}&sort=${sort}`;

  if (search && search !== '*') {
    discussions = await axios.post(`${url}/api/discussions/search/?${params}`, {
      text: search
    });
    return discussions.data.data.results;
  } else {
    discussions = await axios.get(`${url}/api/discussions/?${params}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return discussions.data.data.data;
  }
};

export const getDiscussionById = async (id) => {
  const discussion = await axios.get(`${url}/api/discussions/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  return discussion.data.data.data;
};

export const createDiscussion = async ({ jwt, data }) => {
  const result = await axios.post(
    `${url}/api/discussions/`,
    data.discussionData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );
  if (data.formdata) {
    await axios({
      method: 'patch',
      url: `${url}/api/discussions/${result.data.data.data.id}`,
      data: data.formdata,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  return result.data.data.data;
};

export const getPopular = async () => {
  const discussion = await axios.get(`${url}/api/discussions/popular`);
  return discussion.data.data.results;
};

export const vote = async ({ jwt, id, type, vote }) => {
  await axios.patch(
    `${url}/api/${type}/${vote}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );
};

export const deleteDiscussion = async ({ jwt, id }) => {
  const data = await axios.delete(`${url}/api/discussions/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return data;
};
