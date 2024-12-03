import $api from "./index";

export const getPosts = (params) => {
  if (!params) {
    return $api.get(`/posts?page=1`);
  }
  return $api.get(`/posts?${params}`);
};

export const getPostsByUserId = (userId, params) => {
  if (!params) {
    return $api.get(`/posts/${userId}/user?page=1`);
  }
  return $api.get(`/posts/${userId}/user?${params}`);
};

export const getPostById = (id) => {
  return $api.get(`/posts/${id}`);
};

export const getComments = (id) => {
  return $api.get(`/posts/${id}/comments`);
};

export const deletePost = (id) => {
  return $api.delete(`/posts/${id}/`);
};
