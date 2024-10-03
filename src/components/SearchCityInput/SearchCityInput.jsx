// tools
import PropTypes from "prop-types";
import { useState } from "react";

// assets
import searchIcon from "../../assets/search-icon.svg";

// api functions
import { fetchCityMatch, fetchWeatherData } from "../../api";

// styles
import "./SearchCityInput.css";

export default function SearchCityInput({
  userInput,
  setUserInput,

  isSearchValid,
  setIsSearchValid,

  setIsLoading,

  setCityWeatherData,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage(message);
    setIsSearchValid(false);
    setIsLoading(false);
  };

  // Function to check if the user input is valid
  const checkIfSearchIsValid = async (input) => {
    // check if the input is empty
    if (input === "") {
      handleError("Please enter a city name.");
      return false;
    }

    // check if the input matches real city names from the API
    try {
      const data = await fetchCityMatch(input);

      if (data.length > 0) {
        return true;
      } else {
        handleError(
          "No matching city found. Please check the spelling and try again."
        );
        return false;
      }
    } catch (error) {
      handleError(
        "An unexpected error occurred while searching. Please try again later."
      );
      console.error(
        `Failed to find a city match for "${input}": ${error.message}.`
      );
      return false;
    }
  };

  // Function to fetch data from the API after the user input is validated
  const getCityData = async (city) => {
    try {
      const result = await fetchWeatherData(city);

      if (result?.current && result?.forecast && result?.location) {
        setIsSearchValid(true);
        setCityWeatherData(result);
      } else {
        handleError(
          "Some data could not be retrieved. Please try again later."
        );
        console.error(
          `Incomplete data received for "${city}". Required fields missing: current, forecast, or location.`
        );
      }
    } catch (error) {
      handleError(
        "An unexpected error occurred while searching. Please try again later."
      );
      console.error(`Failed to fetch data for "${city}": ${error.message}.`);
    }
  };

  // Function to handle the form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Start loading
    setIsLoading(true);

    // Check if the user input is valid
    const isValidSearch = await checkIfSearchIsValid(userInput);

    // If the input is valid, fetch the data
    if (isValidSearch) {
      await getCityData(userInput);
    }

    // Reset user input
    setUserInput("");

    // Stop loading
    setIsLoading(false);
  };

  // Function to handle the input search
  const handleInputSearch = (e) => {
    const inputValue = e.currentTarget.value;
    setUserInput(inputValue);
    setIsSearchValid(null);
    setErrorMessage("");
  };

  return (
    <div className="input-container">
      <form action="" className="search-bar" onSubmit={handleFormSubmit}>
        <button
          type="submit"
          className="search-button"
          aria-label="Button to search for a city"
        >
          <img
            src={searchIcon}
            className="search-icon"
            alt="search icon"
            aria-hidden
          />
        </button>

        <input
          type="text"
          name="search-input"
          value={userInput}
          className="search-input"
          placeholder="Enter city name (e.g., New York)"
          autoFocus
          autoComplete="off"
          aria-label="Input field for city name search"
          aria-required="true"
          onChange={handleInputSearch}
        />
      </form>

      {isSearchValid === false && (
        <p className="error-message" role="alert" aria-live="assertive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

SearchCityInput.propTypes = {
  userInput: PropTypes.string.isRequired,
  setUserInput: PropTypes.func.isRequired,

  isSearchValid: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  setIsSearchValid: PropTypes.func.isRequired,

  setIsLoading: PropTypes.func.isRequired,

  setCityWeatherData: PropTypes.func.isRequired,
};
