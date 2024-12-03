import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../api/getPosts";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "../store/postSlise";

export function usePosts(postId) {
  const dispatch = useDispatch();
  const shouldUpdatePosts = useSelector(
    (state) => state.posts.shouldUpdatePosts
  );

  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPostsData() {
      const response = await getPosts(searchParams.toString());

      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    }

    fetchPostsData()
      .then(() => {dispatch(postUpdated())})
      .catch((e) => console.log(e));
    //eslint-disable-next-line
  }, [searchParams, shouldUpdatePosts]);

  return {
    totalPages,
    posts,
  };
}
