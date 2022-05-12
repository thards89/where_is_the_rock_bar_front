import axios from "axios";

export const getHomeData = (homeData) => ({
  type: "home/getHomeData",
  payload: homeData,
});

export const dataHomepage = (lat, lng, radius, placeType) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("https://where-is-the-rock-bar.herokuapp.com/homeData", {
        lat,
        lng,
        radius,
        placeType,
      });

      dispatch(getHomeData(response.data.homeData.results));
    } catch (error) {
      console.log(error);
    }
  };
};
