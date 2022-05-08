import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBlogsWithUserName } from "../../store/blog/selector";
import { fetchAllBlogsWithUserName } from "../../store/blog/actions";
import React from "react";
import { NavLink } from "react-router-dom";

export default function ViewBlogs() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const blogs = useSelector(selectAllBlogsWithUserName);

  useEffect(() => {
    dispatch(fetchAllBlogsWithUserName);
  }, [dispatch]);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredBlogs(
        [...blogs].filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            blog.location.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        )
      );
    } else {
      return setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  return (
    <div>
      <div className="container h-screen flex align-center items-top flex-column">
        {/* <div className="absolute top-4 left-3 ">
            {" "}
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{" "}
          </div>{" "} */}
        <div>
          <div className="flex align-center justify-center mt-10">
            <input
              type="search"
              className="h-14 w-96 mt-4 pl-10 pr-20 rounded-lg z-0 focus:shadow bg-gray-200 focus:outline-none "
              placeholder="Search for a place..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            {/* <button
              onClick={console.log("clicked")}
              className="h-10 w-20 mt-4 text-white rounded-lg bg-blue-500 hover:bg-blue-600 ml-10"
            >
              Search
            </button> */}
          </div>
        </div>
        <div className="flex flex-row justify-center flex-wrap mt-10 rounded gap-5">
          {filteredBlogs.map((blog) => {
            return (
              <div className="flex m-3">
                <div className="flex flex-col w-96 h-96 max-w-7xl rounded-lg bg-white shadow-lg">
                  <img
                    className=" w-full h-96 md:h-44 object-cover md:w-full rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={blog.mainImageUrl}
                    alt=""
                  />
                  <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                      {blog.title}
                    </h5>
                    <p className="text-gray-700 text-sm mb-2">
                      <b>By:</b> {blog.user.name}
                    </p>
                    <p className="text-gray-700 text-base mb-10">
                      <b>Location:</b> {blog.location}
                    </p>
                    <NavLink to={`/blogs/viewblog/${blog.id}`}>
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Know Experience
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
