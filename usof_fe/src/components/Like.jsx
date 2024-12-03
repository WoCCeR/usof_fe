import React from "react";
import "./styles/ActionContainer.scss";
import { UilPlus, UilMinus } from "@iconscout/react-unicons";

const LikeField = ({ selectedLikeType, setLike, grade }) => {
    function getLikeClassName(iconLikeType) {
        return `icon ${selectedLikeType === iconLikeType ? "selected-icon" : ""}`;
    }

    return (
        <div>
            <div className="flex-center action-container">
                <button className="transparent-button" onClick={() => setLike("like")}>
                    <UilPlus className={getLikeClassName("like")} />
                </button>
                <button
                    className="transparent-button"
                    onClick={() => setLike("dislike")}
                >
                    <UilMinus className={getLikeClassName("dislike")} />
                </button>
                <span>{grade}</span>
            </div>
        </div>
    );
};

export default LikeField;
