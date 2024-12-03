import React, { useState } from "react";
import Modal from "../Modal";
import { updateAvatar } from "../../api/user";
import checkAuth from "../../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { UilPen } from "@iconscout/react-unicons";

const UpdateUserProfile = () => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  async function uploadFile() {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await updateAvatar(formData);
      const res = await checkAuth();
      if (res) dispatch(setUser(res));
      setEdit(false);
    } catch (error) {
      setUploadError("Failed to upload the avatar. Please try again.");
    }
  }

  return (
      <div>
        <button
            className="transparent-button editAvatar"
            onClick={() => setEdit(true)}
        >
          <UilPen size={16} />
        </button>
        <Modal isOpen={isEdit} onCancel={() => setEdit(false)}>
          <div className="editAvatarField">
            <h3>Update Avatar</h3>
            <input
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setUploadError("");
                }}
            />
            {uploadError && <p className="error">{uploadError}</p>}
            <div className="modalActions">
              <button className="primary-btn" onClick={uploadFile}>
                Upload
              </button>
              <button className="secondary-btn" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
  );
};

export default UpdateUserProfile;
