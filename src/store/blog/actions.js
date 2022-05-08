import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export const BLOG_CREATION_SUCCESS = "BLOG_CREATION_SUCCESS";
export const VIEW_BLOG_DETAIL = "VIEW_BLOG_DETAIL";
export const blogCreationSuccess = (data) => ({
  type: BLOG_CREATION_SUCCESS,
  payload: data,
});
export const viewBlogbyId = (data) => ({
  type: VIEW_BLOG_DETAIL,
  payload: data,
});
export function allBlogsWithUserNameFetched(data) {
  return {
    type: "blogs/getAllBlogsWithUserName",
    payload: data,
  };
}
export function startLoading() {
  return {
    type: "blogs/loading",
  };
}
export const createBlog = (
  title,
  description,
  urls,
  location,
  place,
  visitedOn,
  userId
) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const { token } = selectUser(getState());
      console.log("data", title, description, urls, location, place, visitedOn);
      const response = await axios.post(
        `${apiUrl}/blogs/createblog`,
        {
          title,
          description,
          urls,
          location,
          place,
          visitedOn,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data);
      dispatch(blogCreationSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Blog created"));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error);
      dispatch(appDoneLoading());
    }
  };
};

export function fetchBlogDetails(id) {
  return async function thunk(dispatch, getState) {
    try {
      const detailresponse = await axios.get(`${apiUrl}/blogs/viewblog/${id}`);
      console.log("detail",detailresponse);
      dispatch(viewBlogbyId(detailresponse.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}


export async function fetchAllBlogsWithUserName(dispatch, getState) {
  dispatch(startLoading());
  const response = await axios.get(`${apiUrl}/blogs/viewblogwithusername`);
  console.log("thunk blogs", response.data);

  dispatch(allBlogsWithUserNameFetched(response.data));
}

