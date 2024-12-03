import React, { useState } from "react";
import "../styles/ActionContainer.scss";

import { UilEdit } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useAuth } from "../../hooks/useAuth";
import { deletePostById } from "../../api/createPost";

import Modal from "../Modal";
import WriteblePostField from "../post/WriteblePostField";

const UpdatePostTools = ({ authorLogin, post, setDeleted }) => {
  const [isEdit, setEdit] = useState(false);
  const { userLogin } = useAuth();

  async function deletePost(postId) {
    await deletePostById(postId)
      .then(() => setDeleted(true))
      .catch((e) => console.log(e));
  }

  function editPost() {
    setEdit(true);
  }

  return (
    <div>
      <Modal isOpen={isEdit}>
        <WriteblePostField editPost={post} setEditPost={setEdit} />
      </Modal>

      {userLogin === authorLogin ? (
        <div className="updateTools">
          <button className="transparent-button" onClick={() => editPost()}>
            <UilEdit width={17} height={17} />
          </button>

          <button
            className="transparent-button"
            onClick={() => deletePost(post.id)}
          >
            <UilTrashAlt width={17} height={17} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UpdatePostTools;
