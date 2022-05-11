import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { createBlog } from "../../store/blog/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import "./style.css";
import { blue } from "@mui/material/colors";
export default function CreateBlog() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [place, setPlace] = useState();
  const [visitedOn, setvisitedOn] = useState();
  const urls = [];
  const [images, setImages] = useState(urls);
  
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const navigateBlogs = () => {
    setAnchorElNav(navigate("/blogs"));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const userId = user.id;
    dispatch(
      createBlog(title, description, images, location, place, visitedOn, userId)
    );
    setImages("");
    setTitle("");
    setDescription("");
    setLocation("");
    setPlace("");
    setvisitedOn("dd-mm-jjjj");
    navigateBlogs()    
  }
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      let fileurl = files[i];
      data.append("file", fileurl);
      //first parameter is always upload_preset, second is the name of the preset
      data.append("upload_preset", "gej9u76y");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/portfolioherhelp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      urls.push(file.url);
    }
    console.log(urls);
    setImages(urls);
  };
  return (
    <div>
            <p className="titleCreateBlog">Create a Blog</p>
    
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:"Inter"
        
      }}
    >

      <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm={4}>
            Title of the Blog:
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label column sm={6}>
            Share Experience:
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              as="textarea"
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput2"
        >
          <Form.Label column sm={4}>
            City
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput6"
        >
          <Form.Label column sm={4}>
            Place
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Place name"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput3"
        >
          <Form.Label column sm={4}>
            Visited On
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="date"
              value={visitedOn}
              onChange={(e) => setvisitedOn(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formFile" className="mb-3">
          <Form.Label column sm={4}>
            Upload Pictures
          </Form.Label>
          <Col sm={8}>
            <Form.Control type="file"
              multiple
              onClick={(e) => e.stopPropagation()}
              onChange={uploadImage}
            />
          </Col>

        </Form.Group>
        <b>Please wait for the images preview! It may take some minutes! :)</b>
       

        {
        images.length>0 && 
          <div className="imagecontainer" >
          {images.length > 0 &&
            images.map((image) => (
              <img src={image} alt="xx" className="imgdimension" />
              ))}
        </div>
            }
        <div style={{ marginTop: "10px" }}>
          <Button variant="secondary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
}
