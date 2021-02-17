import axios from 'axios';
import { Config } from './config';

const url = Config.URL;

export const signIn = async ({ email, password }) => {
  const doc = await axios.post(`${url}/api/users/login`, {
    email: email,
    password: password
  });
  const token = doc.data.token;
  const user = doc.data.data.user;
  return { token, user };
};

export const signUp = async ({ email, password, passwordConfirm, name }) => {
  const doc = await axios.post(`${url}/api/users/signup`, {
    name,
    email,
    password,
    passwordConfirm
  });
  const token = doc.data.token;
  const user = doc.data.data.user;
  return { token, user };
};

export const forgotPassword = async (email) => {
  const doc = await axios.post(`${url}/api/users/forgotPassword`, {
    email
  });
  return doc.data.message;
};

export const updateMe = async ({ jwt, updatedData, image }) => {
  const doc = await axios.patch(`${url}/api/users/updateMe`, updatedData, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  if (image) {
    const imageUser = await axios({
      method: 'patch',
      url: `${url}/api/users/updateMe`,
      data: image,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return imageUser.data.data.user;
  }
  const user = doc.data.data.user;
  return user;
};

export const deleteMe = async (jwt) => {
  const doc = await axios.delete(`${url}/api/users/deleteMe`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return doc;
};

export const getFollowing = async (jwt) => {
  const doc = await axios.get(`${url}/api/users/follow`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${jwt}`
    }
  });
  const result = doc.data.data.result;
  return result;
};

export const getDiscussions = async (jwt) => {
  const doc = await axios.get(`${url}/api/users/discussion`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${jwt}`
    }
  });
  const result = doc.data.data.discussions;
  return result;
};

export const getMe = async (jwt) => {
  const doc = await axios.get(`${url}/api/users/me`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${jwt}`
    }
  });
  const user = doc.data.data.data;
  return user;
};

export const getUserById = async ({ jwt, id }) => {
  const doc = await axios.get(`${url}/api/users/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${jwt}`
    }
  });
  const user = doc.data.data.data;
  return user;
};

export const follow = async ({ jwt, id }) => {
  const doc = await axios.patch(
    `${url}/api/users/follow/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );
  const user = doc.data.data.data;
  return user;
};

export const unfollow = async ({ jwt, id }) => {
  const doc = await axios.patch(
    `${url}/api/users/unfollow/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );

  const user = doc.data.data.data;
  return user;
};

export const resetPassword = async ({ password, passwordConfirm, token }) => {
  const doc = await axios.patch(`${url}/api/users/resetPassword/${token}`, {
    password,
    passwordConfirm
  });
  return { user: doc.data.data.user, token: doc.data.token };
};

export const getLeaderboard = async () => {
  const doc = await axios.get(`${url}/api/users/leaderboard`);
  return doc.data.data.results;
};
