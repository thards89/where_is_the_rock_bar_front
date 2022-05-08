const initialState = {
  loading: true,
  blogsWithUserName: [],
};

export default function blogsSliceReducer(state = initialState, action) {
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

    default: {
      return state;
    }
  }
}
