import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

// getLikes, deleteLike, setLike - API functions
export function useLikes(getLikes, deleteLike, setLike, entityId) {
  const { userData } = useAuth();
  const [grade, setGrade] = useState(0);
  const [likeType, setLikeType] = useState("");

  useEffect(() => {
    async function fetchLikesData() {
      const response = await getLikes(entityId);
      const likes = response.data.likes;
      const dislikes = response.data.dislikes;

      setGrade(likes.length - dislikes.length);

      if (userData) {
        const userGrade = [...likes, ...dislikes].filter(
          (like) => like.login === userData.login
        );

        setLikeType(userGrade[0] ? userGrade[0].likeType : "");
      }
    }

    fetchLikesData()
      .then()
      .catch((e) => console.log(e));
  }, [entityId, likeType]);

  function like(type) {
    if (likeType === type) {
      deleteLike(entityId)
        .then(() => {
          setLikeType("");
        })
        .catch((e) => console.log(e));

      return;
    }

    setLike(entityId, type)
      .then(() => {
        setLikeType(type);
      })
      .catch((e) => console.log(e));
  }

  return {
    setLike: like,
    selectedLikeType: likeType,
    grade,
  };
}
