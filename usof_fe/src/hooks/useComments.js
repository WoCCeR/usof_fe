import { useEffect, useState } from "react";
import { getCommentsByPost } from "../api/comment";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "../store/postSlise";

export function useComments(postId) {
  const dispatch = useDispatch();
  //TODO: VOBSE BRED, NO SROKI GORAT
  const shouldUpdatePosts = useSelector(
    (state) => state.posts.shouldUpdatePosts
  );

  const [shouldUpdateComment, setShouldUpdateComment] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchCommentsData() {
      const response = await getCommentsByPost(postId);

      setComments(response.data);
      setShouldUpdateComment(false);
      dispatch(postUpdated(false));
    }

    fetchCommentsData()
      .then()
      .catch((e) => console.log(e));

    //eslint-disable-next-line
  }, [postId, shouldUpdateComment, shouldUpdatePosts]);

  return {
    commentsCount: comments.length,
    comments,
    setShouldUpdateComment,
  };
}
