import "./styles/Comment.scss";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/post/Post";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/getPosts";
import WritebleCommentField from "../components/comment/WritebleCommentField";
import Comment from "../components/comment/Comment";
import { useComments } from "../hooks/useComments";

const Comments = () => {
  const { postId } = useParams();
  const { comments, setShouldUpdateComment } = useComments(postId);

  const [post, setPost] = useState(undefined);

  useEffect(() => {
    async function fetchPostData() {
      const response = await getPostById(postId);

      setPost(response.data);
    }

    fetchPostData()
      .then()
      .catch((e) => console.log(e));

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <section>
        <div className="commentsContent">
          {post && (
            <>
              <Post
                postId={post.id}
                authorLogin={post.authorLogin}
                title={post.title}
                content={post.content}
                categories={post.categories}
                publishDate={post.publishDate}
                post={post}
              />
              <WritebleCommentField
                idPost={post.id}
                setShouldUpdateComment={setShouldUpdateComment}
              />
            </>
          )}
          <span className="centerText">Comments</span>
          <div class="underline"></div>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                commentId={comment.id}
                authorLogin={comment.loginOwner}
                content={comment.content}
                publishDate={comment.date}
                comment={comment}
              />
            ))
          ) : (
            <div className="centerText" style={{ fontSize: "32px" }}>
              Comments not found
            </div>
          )}
        </div>
        {/* <ProfileInfo /> */}
      </section>
      <footer></footer>
    </div>
  );
};

export default Comments;
