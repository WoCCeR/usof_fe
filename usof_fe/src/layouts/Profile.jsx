import "./styles/Profile.scss";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/post/Post";

import { useSearchParams } from "react-router-dom";
import { getPostsByUserId } from "../api/getPosts";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

import ProfileInfo from "../components/ProfileInfo";
import WriteblePostField from "../components/post/WriteblePostField";
import PageList from "../components/PageList";

const Profile = () => {
  const updatePosts = useSelector((state) => state.posts.shouldUpdatePosts);
  const { userData } = useAuth();

  const [shouldUpdatePosts, setShouldUpdatePosts] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams({ page: "1" });
    }
    async function fetchData() {
      if (!userData) return;

      const response = await getPostsByUserId(
        userData.id,
        searchParams.toString()
      );

      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    }

    fetchData()
      .then()
      .catch((e) => console.log(e));

    setShouldUpdatePosts(false);

    //eslint-disable-next-line
  }, [userData, searchParams, shouldUpdatePosts, updatePosts]);

  return (
      <div>
        <Header/>
        <section>
          <div className="profile">
            <ProfileInfo/>
          </div>
          <div className="postContent">
            <WriteblePostField setShouldUpdatePosts={setShouldUpdatePosts}/>
            <span className="centerText">Your Posts</span>
            <div className="underline"></div>
            {posts.length > 0 ? (
                <div className="postsbox">
                  {posts.map((post) => (
                      <Post
                          key={post.id}
                          postId={post.id}
                          authorLogin={post.authorLogin}
                          title={post.title}
                          content={post.content}
                          categories={post.categories}
                          publishDate={post.publishDate}
                          post={post}
                      />
                  ))}
                </div>
            ) : (
                <div className="centerText" style={{ fontSize: "32px" }}>Posts not found</div>
            )}

            <PageList postsLength={posts.length} totalPages={totalPages}/>
          </div>
        </section>
        <footer></footer>
      </div>

  );
};

export default Profile;
