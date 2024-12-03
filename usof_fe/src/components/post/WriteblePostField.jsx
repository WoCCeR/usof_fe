import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePost, createPost } from "../../api/createPost";
import { getCategories } from "../../api/category";
import { updatePosts } from "../../store/postSlise";

import Select from "react-select";

const WriteblePostField = ({ editPost, setEditPost }) => {
  const dispatch = useDispatch();

  const [post, setPost] = useState({ title: "", content: "", categories: [] });
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  function clearWriteField() {
    setPost({ title: "", content: "", categories: [] });
    dispatch(updatePosts())
    setSelectedOption(null);
  }

  const shareNewPost = async () => {
    try {
      post.categories = selectedOption.map((option) => option.value);

      await createPost(post);
      clearWriteField();
    } catch (error) {
      console.log(error);
    }
  };

  const shareEditPost = async () => {
    try {
      post.categories = selectedOption.map((option) => option.value);

      await changePost(editPost.id, post);
      clearWriteField();
      setEditPost(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editPost) {
      const editCategories = editPost.categories.split(", ");

      setPost({
        title: editPost.title || "",
        content: editPost.content || "",
        categories: editCategories,
      });
      setSelectedOption(
        editCategories.map((category) => ({
          value: category,
          label: category,
        }))
      );
    }
  }, [editPost]);

  useEffect(() => {
    async function fetchPostsData() {
      const response = await getCategories();
      setCategories(response.data);
    }
    fetchPostsData()
      .then()
      .catch((e) => console.log(e));
  }, []);

  function exitFromEditMode() {
    clearWriteField();
    setEditPost(false);
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className="post-commet">
      <div className="newPost">
        <input
          value={post ? post.title : ""}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Title"
        ></input>
        <textarea
          value={post ? post.content : ""}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows="4"
          cols="50"
          placeholder="Contetent"
        ></textarea>
        <Select
          className="select"
          value={selectedOption}
          options={categories.map((category) => ({
            value: category.title,
            label: category.title,
          }))}
          onChange={handleChange}
          closeMenuOnSelect={false}
          isMulti
        />
      </div>
      {!editPost ? (
        <button className="postButton" onClick={shareNewPost}>
          Post
        </button>
      ) : (
        <div>
          <button className="postButton" onClick={shareEditPost}>
            Edit
          </button>
          <button className="postButton" onClick={exitFromEditMode}>
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default WriteblePostField;
