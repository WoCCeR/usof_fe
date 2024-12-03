import { useEffect, useState } from "react";
import { getCategories } from "../api/category";

export function useCategories(postId) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategoriesData() {
      const response = await getCategories();
      console.log(response);
      setCategories(response.data);
    }

    fetchCategoriesData()
      .then()
      .catch((e) => console.log(e));
  }, []);

  return {
    categories,
  };
}
