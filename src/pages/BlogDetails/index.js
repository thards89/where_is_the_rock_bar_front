import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetails } from "../../store/blog/actions";
import { selectBlogDetail } from "../../store/blog/selector";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../BlogDetails/blogdetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogdetail = useSelector(selectBlogDetail);
  useEffect(() => {
    console.log("going here");
    dispatch(fetchBlogDetails(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-lg my-3 mx-20">
      <div className="flex flex-col m-20 mb-3">
        <h1 className="text-gray-1000 text-center mb-10">
          {blogdetail.name_of_place}
        </h1>
        <p>{blogdetail.description}</p>
      </div>

      <div className="img-container">
        {!blogdetail
          ? "Loading"
          : blogdetail.moreImages?.length > 0
          ? // <Carousel fade >
            blogdetail.moreImages.map((eachimg) => {
              return (
                // <Carousel.Item className="item" key={eachimg.id}>
                <div className="img-container">
                  <img
                    className="img-size"
                    src={eachimg.ImageUrl}
                    alt={blogdetail.title}
                  />
                </div>
                // </Carousel.Item>
              );
            })
          : // </Carousel>
            "No images uploaded."}
      </div>
    </div>
  );
}
