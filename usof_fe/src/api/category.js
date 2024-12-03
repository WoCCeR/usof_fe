import $api from "./index";

export const getCategories = () => {
    return $api.get(`/categories`);
}

export const createCategory = (category) => {
    return $api.post(`/categories`, category);
}