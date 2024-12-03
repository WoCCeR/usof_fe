import React, { useEffect, useState } from "react";
import { changeComment, createComment } from "../../api/comment";
import { useDispatch } from "react-redux";
import { updatePosts } from "../../store/postSlise";

const WritebleCommentField = ({
                                idPost,
                                setShouldUpdateComment,
                                editComment,
                                setEdit,
                              }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState({ content: "" });

  // Clear the comment field
  const clearCommentField = () => setComment({ content: "" });

  // Handle creating a new comment
  const handleNewComment = async () => {
    try {
      await createComment(idPost, comment);
      setShouldUpdateComment(true);
      clearCommentField();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Handle editing an existing comment
  const handleEditComment = async () => {
    try {
      await changeComment(editComment.id, comment);
      dispatch(updatePosts());
      clearCommentField();
      setEdit(false);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Exit edit mode
  const exitEditMode = () => {
    clearCommentField();
    setEdit(false);
  };

  // Populate the comment field when entering edit mode
  useEffect(() => {
    if (editComment) {
      setComment({ content: editComment.content || "" });
    }
  }, [editComment]);

  return (
      <div className="post-comment">
        <div className="writebleCommentField">
        <textarea
            value={comment.content}
            onChange={(e) => setComment({ ...comment, content: e.target.value })}
            rows="4"
            cols="50"
            placeholder="Write your comment..."
            aria-label="Write your comment"
        ></textarea>
        </div>
        <div>
          {!editComment ? (
              <button className="postButton" onClick={handleNewComment}>
                Post Comment
              </button>
          ) : (
              <>
                <button className="postButton" onClick={handleEditComment}>
                  Save Edit
                </button>
                <button className="postButton" onClick={exitEditMode}>
                  Cancel
                </button>
              </>
          )}
        </div>
      </div>
  );
};

export default WritebleCommentField;
