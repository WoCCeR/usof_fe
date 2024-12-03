import $api from "./index";

export const getCommentById = (commetId) => {
    return $api.get(`/comments/${commetId}`);
}

export const getCommentsByPost = (postId) => {
    return $api.get(`/posts/${postId}/comments`);
}

export const createComment = (postId, content) => {
    return $api.post(`/posts/${postId}/comments`, content);
}

export const changeComment = (commetId, content) => {
    return $api.patch(`/comments/${commetId}`, content);
}

export const deleteCommentById = (commetId) => {
    return $api.delete(`/comments/${commetId}`);
}