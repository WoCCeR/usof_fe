import $api from "./index";

export const getUsertById = (userId) => {
  return $api.get(`/users/${userId}`);
};

export const updateAvatar = (formDate) => {
  return $api.post(`/users/uavatar`, formDate, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};