import React from "react";
import { UilAt, UilAdjustHalf } from "@iconscout/react-unicons";

import { useAuth } from "../hooks/useAuth";
import { useUserAvatar } from "../hooks/useUserAvatar";
import UpdateUserProfile from "../components/tools/UpdateUserProfile";

const ProfileInfo = () => {
  const { userData, userId } = useAuth();
  const { avatar } = useUserAvatar(userId);

  if (!userData) {
    return null;
  }

  return (
      <div className="profile">
        <div className="cover">
          <img width={60} height={60} className="avatar" src={avatar} alt={`${userData.fullName}'s Avatar`} />
        </div>
        <div className="info">
          <div className="d-flex align-items-center">
            <h2 className="authorInfo">{userData.fullName}</h2>
            <UpdateUserProfile />
          </div>
          <p className="login">{`${userData.login}`}</p>
          <div className="additionalInfo">
            <div className="infoItem flex-center">
              <UilAt size={18} />
              <span className="email">
              <u>{userData.email}</u>
            </span>
            </div>
            <div className="infoItem flex-center">
              <UilAdjustHalf size={18} />
              <span>{`Rating: ${userData.rating}`}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileInfo;
