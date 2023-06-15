import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHomeData } from "../../store/home/selector";
import { dataHomepage } from "../../store/home/actions";
import { apiKey } from "../../config/constants";

import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Slider } from "@mui/material";

export default function Homepage() {
  const homeData = useSelector(selectHomeData);
  console.log("this is selector", homeData);
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null,
  });

  const [type, setType] = useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    console.log(ll);
    setAddress(value);
    setCoordinates(ll);
  };

  const [range, setRange] = useState(5000);

  const sumbitSearch = (e) => {
    const { lat, lng } = coordinates;
    const radius = range;
    const placeType = type;
    dispatch(dataHomepage(lat, lng, radius, placeType));
    e.preventDefault();
    window.location.replace("/#results");
  };

  return (
    <div>
      {/* Homepage Start */}
      <div className="containerSearchPage">
        <div className="rounded overflow-hidden shadow-sm w-500 relative">
          <img
            className="w-screen h-200px grayscale"
            src="https://images.pexels.com/photos/325811/pexels-photo-325811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4 text-center container absolute top-20 left-20 right-20 bg-slate-50/75 homePageMainTextContainer ">
            <div className="homePageTitleContainer">
              <div className="font-bold text-xl mb-2 mt-10 responsiveTitleContainer">
                <h1 className="homePageMainTitle">Welcome Rocker!</h1>
              </div>
              <div className="text-gray-700 text-base p-10 homePageTextContainer">
                <div>
                  <h4 className="leading-loose homePageMainText">
                    In this website you can easily find where is the closest
                    Rock Bar, Metal Bar, Irish Pub, Rock Restaurant, Music Venue
                    and CoffeeShops near you!
                  </h4>
                </div>
                <div>
                  <h4 className="leading-loose homePageMainText">
                    You can also create a blog and post your photos and opinion
                    about the places you have visited and you can also check
                    other user`s posts.
                  </h4>
                </div>
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
      </div>
      {/* search */}
      <div>
        <div className="searchSection-align">
        <div className="titleSearchPage">
          <p>Where is the Rock Bar?</p>
          </div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="inputContainer">
              <input
                className="inputField"
                {...getInputProps({
                  placeholder: "Insert a name of a city",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
     
      {/* Type of Place */}
      <div className="flex align-center responsiveSuggestions" id="search">
        <select
          className="selectField
          form-select form-select-sm
        appearance-none
        block  
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
          aria-label="Default select example"
          onChange={(e) => setType(e.target.value)}
        >
          <option defaultValue>Type of place</option>
          <option value="Rockbar">Rock Bar</option>
          <option value="Metal bar">Metal Bar</option>
          <option value="Irish Pub">Irish Pub</option>
          <option value="Rock Restaurant">Rock Restaurant</option>
          <option value="Music Venue">Music Venue</option>
          {/* <option value="Coffeeshop">Coffeeshop</option> */}
        </select>
        {/* Range */}
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
          className="h-10 w-20 text-white rounded-lg bg-slate-900 hover:bg-slate-500 mb-20 mt-4 pt-2 pb-2 pr-2 pl-2 justify-center responsiveSearchButtonHomePapge"
        >
          Search
        </button>
        </div>
        </div>
      </div>
      {/* RESULTS */}
      <div>
        {homeData && (
          <div id="results" className="results">
            Results
          </div>
        )}
        <div className="flex flex-row justify-center flex-wrap mt-10 rounded gap-5 ">
          {!homeData
            ? "" :
            homeData.map((data) => {
                return (
                  <div className="flex m-3 ">
                    <div className="flex flex-col w-96 h-96 max-w-7xl rounded-lg bg-white shadow-lg overflow-auto scrollbar ">
                      {data.photos?.length ? (
                        data.photos.map((photos) => {
                          return (
                            <img
                              className=" w-full h-96 md:h-44 object-cover md:w-full rounded-xl rounded-br-xl md:rounded-none md:rounded-l-lg responsiveImageCard"
                              src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photos.photo_reference}&maxwidth=300&key=${apiKey}`}
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
            }
        </div>
      </div>
    </div>
  );
}
