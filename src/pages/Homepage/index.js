import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from "react-redux";
import { dataHomepage } from "../../store/home/actions";
import { useState } from "react";
import { selectHomeData } from "../../store/home/selector";
import { Slider } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function Homepage() {
  const homeData = useSelector(selectHomeData);
  console.log("this is selector", homeData);
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });
  const [range, setRange] = useState(5000);
  const [type, setType] = useState("");
  console.log(type);
  //   const methods = usePlacesAutocomplete({
  //     // Provide the cache time in seconds, default is 24 hours
  //     cache: 24 * 60 * 60,
  //   });
  const ratingToStars = (rating) => {
    if (!rating) return "";
    let result = "";
    for (let i = 0; i < Math.round(rating); i++) {
      result = result + "⭐";
    }

    return result;
  };
  // ;}
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
          // store to local state
          setLocation({ lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const sumbitSearch = (e) => {
    const { lat, lng } = location;
    const radius = range;
    const placeType = type;
    dispatch(dataHomepage(lat, lng, radius, placeType));
    e.preventDefault();
   window.location.replace("/#results")
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="containerSearchPage">
      <div class="rounded overflow-hidden shadow-sm w-500 relative">
        <img
          class="w-screen h-200px grayscale"
          src="https://images.pexels.com/photos/325811/pexels-photo-325811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4 text-center container absolute top-20 left-20 right-20 bg-slate-50/75 homePageMainTextContainer ">
          <div className="homePageTitleContainer">
            <div class="font-bold text-xl mb-2 mt-10 responsiveTitleContainer">
              <h1 className="homePageMainTitle">Welcome Rocker!</h1>
            </div>
            <div class="text-gray-700 text-base p-10 homePageTextContainer">
              <p>
                <h4 class="leading-loose homePageMainText">
                  In this website you can easily find where is the closest Rock
                  Bar, Metal Bar, Irish Pub, Rock Restaurant, Music Venue and
                  CoffeeShops near you!
                </h4>
              </p>
              <p>
                <h4 class="leading-loose homePageMainText">
                  You can also create a blog and post your photos and opinion
                  about the places you have visited and you can also check other
                  user`s posts.
                </h4>
              </p>
              <button
              className="bg-slate-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-slate-300 rounded shadow buttonResponsiveHomePage"
              onClick={(e) => {
                e.preventDefault();
                window.location.replace("/#search");
              }}
            >
              <b>Click Here to Start</b>
            </button>
            </div>
            </div>
        </div>
      </div>

      {/* search */}
      <div>
        <div className="titleSearchPage" id="search">
          <p style={{ margin: "10px", color: "#F1F5F9" }}>.</p>
          <p>Where is the Rock Bar?</p>
        </div>
        <div className="container h-screen flex align-center items-top flex-column bg-slate-100 
         containerSearchResponsive">
          <div ref={ref}>
            <div className="flex align-center justify-around mt-10 gap-3 searchBarResponsive">
              <input
                type="text"
                className=" form-control
          block
           mt-3
          p-4
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          searchBar"
                placeholder="Write here the name of your city"
                value={value}
                onChange={handleInput}
                disabled={!ready}
              />
            </div>
            {/* suggestions results */}
            <div className="flex align-center responsiveSuggestions">
              {status === "OK" && <ul>{renderSuggestions()}</ul>}
            </div>
            <div class="mb-3 mt-4 selectHomePage">
              <select
                class="
                  form-select form-select-sm
                appearance-none
                      block      w-20
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                onChange={(e) => setType(e.target.value)}
              >
                <option selected>Type of place</option>
                <option value="Rockbar">Rock Bar</option>
                <option value="Metal bar">Metal Bar</option>
                <option value="Irish Pub">Irish Pub</option>
                <option value="Rock Restaurant">Rock Restaurant</option>
                <option value="Music Venue">Music Venue</option>
                <option value="Coffeeshop">Coffeeshop</option>
              </select>
            </div>
            <div className="flex align-center justify-center flex-column mr-5 ml-5">
              <div className="w-20 mt-2 responsiveSlider">
                <Slider
                  defaultValue={5}
                  min={1}
                  max={30}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  onChange={(e) => setRange(e.target.value * 1000)}
                />
              </div>
              <div className="rangeText">Range in KM</div>
            </div>
            <button
              onClick={sumbitSearch}
              className="h-10 w-20 text-white rounded-lg bg-slate-900 hover:bg-slate-500 mt-4 pt-2 pb-2 pr-2 pl-2 justify-center responsiveSearchButtonHomePapge"
            >
              Search
            </button>
            </div>
          </div>

          {/* RESULTS */}
          <div>
           {homeData && <p id="results" className="results">Results</p>} 
            <div className="flex flex-row justify-center flex-wrap mt-10 rounded gap-5 ">
              {homeData
                ? homeData.map((data) => {
                    return (
                      <div  className="flex m-3 ">
                        <div className="flex flex-col w-96 h-96 max-w-7xl rounded-lg bg-white shadow-lg overflow-auto scrollbar ">
                          {data.photos?.length ? (
                            data.photos.map((photos) => {
                              return (
                                <img
                                  className=" w-full h-96 md:h-44 object-cover md:w-full rounded-xl rounded-br-xl md:rounded-none md:rounded-l-lg responsiveImageCard"
                                  src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photos.photo_reference}&maxwidth=300&key=AIzaSyDGnhMSdxZWn2pTKvaimAKqZif3PqA7LwY`}
                                  alt=""
                                />
                              );
                            })
                          ) : (
                            <img
                              className=" w-full h-96 md:h-44 object-cover md:w-full rounded-lg md:rounded-none md:rounded-l-lg responsiveImageCard"
                              src="https://lijv.nl/wp-content/plugins/ninja-forms/assets/img/no-image-available-icon-6.jpg"
                              alt=""
                            />
                          )}

                          <div className="p-6 flex flex-col justify-start text-clip">
                            <h5 className="text-gray-900 text-xl font-medium mb-2 responsiveTitleCard">
                              {data.name}
                            </h5>

                            <div>
                              <FormGroup>
                                <Box
                                  className="responsiveStars"
                                  sx={{ "& > legend": { mt: 2 } }}
                                >
                                  <Rating
                                    readOnly
                                    precision={0.5}
                                    name="read-only"
                                    value={data.rating}
                                  />
                                </Box>
                              </FormGroup>
                              <div className="ratingText">
                                <b>
                                  {data.rating}/5 stars of {""}
                                  {""}
                                  {data.user_ratings_total} users{" "}
                                </b>
                              </div>

                              <p className="text-gray-700 text-base mb-3 responsiveCardText">
                                <b>Adress:</b> {data.vicinity}
                              </p>

                              <p className="m-0 text-center text-clip overflow-hidden responsiveCardText">
                                {data.opening_hours?.open_now
                                  ? "Open now!"
                                  : "Closed"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
    </div>
  );
}
