import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetails";
import ViewBlogs from "./pages/ViewBlogs";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/blogs" element={<ViewBlogs />} />
        <Route path="/blogs/:blogsId" element={<ViewBlogs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="blogs/createblog" element={<CreateBlog/>} />
        <Route path="blogs/viewblog/:id" element={<BlogDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
