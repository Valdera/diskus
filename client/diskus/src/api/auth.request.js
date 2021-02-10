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

export const forgotPassword = async ({ email }) => {
  const doc = await axios.post(`${url}/api/users/forgotPassword`, {
    email
  });
  return doc.data.message;
};

export const updateMe = async ({ jwt, updatedData }) => {
  const doc = await axios.patch(`${url}/api/users/updateMe`, updatedData, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
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
      Authorization: `Bearer ${jwt}`
    }
  });
  const result = doc.data.data.result;
  return result;
};

export const getDisucssions = async (jwt) => {
  const doc = await axios.get(`${url}/api/users/discussion`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  const result = doc.data.data.discussions;
  return result;
};
