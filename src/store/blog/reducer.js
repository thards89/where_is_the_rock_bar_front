import { BLOG_CREATION_SUCCESS, VIEW_BLOG_DETAIL } from "./actions";
const initialState = {
  blogs: [],
  blogDetail: [],
  loading: true,
  blogsWithUserName: [],
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "blogs/loading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "blogs/getAllBlogsWithUserName": {
      console.log("reducer", action);
      return {
        ...state,
        blogsWithUserName: [...action.payload],
        loading: false,
      };
    }
    case BLOG_CREATION_SUCCESS:
      return { ...state, blogs: { ...action.payload } };

    case VIEW_BLOG_DETAIL:
      return { ...state, blogDetail: { ...action.payload } };
    default:
      return state;
  }
}
