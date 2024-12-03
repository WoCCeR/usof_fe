import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setUser } from "./store/authSlice";
import checkAuth from "./services/authService";

import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import Profile from "./layouts/Profile";
import Comments from "./layouts/Comments";

import { useAuth } from "./hooks/useAuth";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    const storedUserData = localStorage.getItem("isAuth");
    if (storedUserData === "true" && isAuth === false) {
      if (localStorage.getItem("token")) {
        checkAuth().then((res) => {
          if (res) dispatch(setUser(res));
        });
      }
    }
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comments/:postId" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
