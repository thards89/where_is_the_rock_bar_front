import axios from "axios";

const API_URL = "https://where-is-the-rock-bar.herokuapp.com";

export function startLoading() {
  return {
    type: "blogs/loading",
  };
}

export function allBlogsWithUserNameFetched(data) {
  return {
    type: "blogs/getAllBlogsWithUserName",
    payload: data,
  };
}

export async function fetchAllBlogsWithUserName(dispatch, getState) {
  dispatch(startLoading());
  const response = await axios.get(`${API_URL}/blogs/viewblogwithusername`);
  console.log("thunk blogs", response.data);

  dispatch(allBlogsWithUserNameFetched(response.data));
}

