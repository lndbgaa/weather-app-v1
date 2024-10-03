// ------ Main function to Fetch data from API
const fetchApiData = async (endPoint, city) => {
  const baseUrl = "https://api.weatherapi.com/v1/";
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `${baseUrl}${endPoint}.json?key=${apiKey}&q=${city}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Invalid data format received.");
  }

  return data;
};

// ------ Function to Fetch Matching City Data from API
export const fetchCityMatch = async (input) => {
  try {
    const data = await fetchApiData("search", input);
    return data;
  } catch (error) {
    throw new Error(`Could not fetch matching city data: ${error.message}`);
  }
};

// ------ Function to Fetch Weather Data from API
export const fetchWeatherData = async (city) => {
  try {
    const data = await fetchApiData("forecast", city);
    return data;
  } catch (error) {
    throw new Error(`Could not fetch weather data: ${error.message}`);
  }
};
