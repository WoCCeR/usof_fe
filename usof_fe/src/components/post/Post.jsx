import "../styles/Post.scss";
import React, { useEffect, useState } from "react";
import { UilCommentLines } from "@iconscout/react-unicons";
import { deletePostLike, getPostLikes, setPostLike } from "../../api/like";
import { Link } from "react-router-dom";
import { formatDate } from "../../services/dateFormater";
import { useLikes } from "../../hooks/useLikes";
import { useComments } from "../../hooks/useComments";
import { useUserAvatar } from "../../hooks/useUserAvatar";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import LikeField from "../Like";
import UpdatePostTools from "../tools/UpdatePostTools";

const Post = ({
                postId,
                authorLogin,
                publishDate,
                categories = "",
                content,
                title,
                post,
              }) => {
  const [isDeleted, setDeleted] = useState(false);

  const { avatar } = useUserAvatar(post.authorId);
  const { commentsCount = 0 } = useComments(postId);
  const { selectedLikeType, grade, setLike } = useLikes(
      getPostLikes,
      deletePostLike,
      setPostLike,
      postId
  );

  useEffect(() => {
    setDeleted(false);
  }, [postId]);

  const parseCategories = (categories) => {
    return categories
        .split(", ")
        .map((category) => `#${category}`)
        .join(" ");
  };

  return (
      <div className="post">
        {!isDeleted ? (
            <>
              <div className="flex-center">
                <div className="authorInfo">
                  <img
                      className="avatar"
                      width={47}
                      height={47}
                      src={avatar}
                      alt="Author Avatar"
                  />
                  <span>{`${authorLogin}`}</span>
                  <span> • </span>
                  <span className="publishDate">{formatDate(publishDate)}</span>
                </div>
                <UpdatePostTools
                    authorLogin={authorLogin}
                    post={post}
                    isDeleted={isDeleted}
                    setDeleted={setDeleted}
                />
              </div>
              <h4>{`"${title}"`}</h4>
              <div className="markdownStyles">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    children={`${content}\n${parseCategories(categories)}`}
                />
              </div>
              <div className="d-flex">
                <LikeField
                    selectedLikeType={selectedLikeType}
                    setLike={setLike}
                    grade={grade}
                />
                <Link
                    to={`/comments/${postId}`}
                    className="text-link flex-center action-container commentIcon"
                >
                  <UilCommentLines className="icon" />
                  <span>{commentsCount}</span>
                </Link>
              </div>
            </>
        ) : (
            <span className="centerText">The post has been deleted</span>
        )}
      </div>
  );
};

export default Post;
