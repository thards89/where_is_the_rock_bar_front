import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { createBlog } from "../../store/blog/actions";
import { useDispatch } from "react-redux";

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
  // const [loading,setLoading] = useState(false);
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
    <div
      style={{
        marginTop: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label column sm={3}>
            Title:
          </Form.Label>
          <Col sm={8}>
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
            Location
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
          <Col sm={4}>
            <Form.Control type="file"
              multiple
              onClick={(e) => e.stopPropagation()}
              onChange={uploadImage}
            />
          </Col>

          <Form.Label column sm={4} className="mr-6">
            Please wait for image preview
          </Form.Label>
        </Form.Group>

        {/* <div className="imagecontainer" style={{display:images.length>0?"flex" :"none"}}> */}

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
  );
}
