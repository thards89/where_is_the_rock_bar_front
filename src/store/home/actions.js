import axios from "axios";

export const getHomeData = (homeData) => ({
  type: "home/getHomeData",
  payload: homeData,
});

export const dataHomepage = (lat, lng, radius, placeType) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post("https://whereistherockbarback-production.up.railway.app/homeData", {
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
