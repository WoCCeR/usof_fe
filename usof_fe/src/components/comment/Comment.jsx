import React, { useEffect, useState } from "react";
import { formatDate } from "../../services/dateFormater";
import { useLikes } from "../../hooks/useLikes";
import {
  deleteCommentLike,
  getCommentLikes,
  setCommentLike,
} from "../../api/like";
import { useUserAvatar } from "../../hooks/useUserAvatar";

import LikeField from "../Like";
import UpdateCommentTools from "../tools/UpdateCommentTools";

const Post = ({ commentId, authorLogin, publishDate, content, comment }) => {
  const [isDeleted, setDeleted] = useState(false);
  const { avatar } = useUserAvatar(comment.idOwner);

  const { selectedLikeType, grade, setLike } = useLikes(
      getCommentLikes,
      deleteCommentLike,
      setCommentLike,
      commentId
  );

  useEffect(() => {
    setDeleted(false); // Reset deletion status when commentId changes
  }, [commentId]);

  return (
      <div className="comment">
        {isDeleted ? (
            <span className="centerText">The comment has been deleted</span>
        ) : (
            <>
              <div className="flex-center">
                <div className="authorInfo">
                  <img
                      width={30}
                      height={30}
                      className="avatar"
                      src={avatar}
                      alt={`${authorLogin}'s avatar`}
                  />
                  <span>{`${authorLogin}`}</span>
                  <span> • </span>
                  <span className="publishDate">{formatDate(publishDate)}</span>
                </div>
                <UpdateCommentTools
                    authorLogin={authorLogin}
                    comment={comment}
                    setDeleted={setDeleted}
                />
              </div>
              <span className="content">{content}</span>
              <LikeField
                  setLike={setLike}
                  selectedLikeType={selectedLikeType}
                  grade={grade}
              />
            </>
        )}
      </div>
  );
};

export default Post;
