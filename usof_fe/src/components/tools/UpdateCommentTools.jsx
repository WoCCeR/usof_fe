import React, { useState } from "react";
import "../styles/ActionContainer.scss";

import { UilEdit } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useAuth } from "../../hooks/useAuth";

import Modal from "../Modal";
import WritebleCommentField from "../comment/WritebleCommentField";
import { deleteCommentById } from "../../api/comment";

const UpdateCommentTools = ({ authorLogin, comment, setDeleted }) => {
  const [isEdit, setEdit] = useState(false);
  const { userLogin } = useAuth();

  async function deleteCommment(commentId) {
    await deleteCommentById(commentId)
      .then(() => setDeleted(true))
      .catch((e) => console.log(e));
  }

  function editPost() {
    setEdit(true);
  }

  return (
    <div>
      <Modal isOpen={isEdit}>
        <WritebleCommentField editComment={comment} setEdit={setEdit} />
      </Modal>

      {userLogin === authorLogin ? (
        <div className="updateTools">
          <button className="transparent-button" onClick={() => editPost()}>
            <UilEdit width={17} height={17} />
          </button>

          <button
            className="transparent-button"
            onClick={() => deleteCommment(comment.id)}
          >
            <UilTrashAlt width={17} height={17} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UpdateCommentTools;
