const initialState = { homeData: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "home/getHomeData": {
      return {
        ...state,
        homeData: action.payload,
      };
    }

    default:
      return state;
  }
}
