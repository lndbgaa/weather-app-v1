// tools
import PropTypes from "prop-types";

// utils
import { changeTimeFormat, normalizeText } from "../../utils";

// assets
import locationIcon from "../../assets/location-icon.svg";

// styles
import "./CityDataOutput.css";

export default function CityInfoOutput({ cityWeatherData }) {
  const cityName = cityWeatherData.location?.name;
  const countryName = cityWeatherData.location?.country;

  const localTime = cityWeatherData.location?.localtime
    ? cityWeatherData.location?.localtime.split(" ")[1]
    : "";

  const lastUpdate = cityWeatherData.current?.last_updated
    ? cityWeatherData.current?.last_updated.split(" ")[1]
    : "";

  const weatherIcon = cityWeatherData.current?.condition?.icon;
  const weatherTemperature = cityWeatherData.current?.temp_c;
  const weatherDescription = cityWeatherData.current?.condition?.text;

  const realFeel = cityWeatherData.current?.feelslike_c;
  const sunrise = cityWeatherData.forecast?.forecastday[0]?.astro?.sunrise;
  const sunset = cityWeatherData.forecast?.forecastday[0]?.astro?.sunset;

  const uvIndex = cityWeatherData.current?.uv;
  const windSpeed = cityWeatherData.current?.wind_kph;
  const cloudCover = cityWeatherData.current?.cloud;
  const visibility = cityWeatherData.current?.vis_km;
  const rain = cityWeatherData.current?.precip_mm;
  const humidity = cityWeatherData.current?.humidity;
  const windDirection = cityWeatherData.current?.wind_degree;
  const pressure = cityWeatherData.current?.pressure_mb;

  return (
    <div className="output-container">
      {cityName && countryName ? (
        <div className="location-wrapper">
          <img
            src={locationIcon}
            className="location-icon"
            alt="location icon"
            aria-hidden
          />
          <p className="location-description">
            {`${normalizeText(cityName)}, ${normalizeText(countryName)}`}
          </p>
        </div>
      ) : null}

      <div className="data-wrapper">
        <div className="header">
          <p className="day">Today</p>

          {localTime && (
            <p className="local-time">{changeTimeFormat(localTime)}</p>
          )}
        </div>

        <div className="content">
          <div className="main-data">
            <div>
              {lastUpdate && (
                <p className="last-update">{`Last Update: ${changeTimeFormat(lastUpdate)}`}</p>
              )}

              <div className="flex-group">
                {weatherIcon && (
                  <img
                    className="weather-icon"
                    src={weatherIcon}
                    alt="weather icon"
                  />
                )}

                <p className="weather-temperature">
                  {`${weatherTemperature ? weatherTemperature : "N/A"}°C`}
                </p>
              </div>

              {weatherDescription && (
                <p className="weather-description">{weatherDescription}</p>
              )}
            </div>

            <div>
              <div className="real-feel">
                <p>Real Feel</p>
                <p>
                  {" "}
                  {realFeel !== undefined && realFeel !== null
                    ? `${realFeel}°C`
                    : "N/A"}
                </p>
              </div>

              <div className="sunrise">
                <p>Sunrise</p>
                <p>
                  {sunrise !== undefined && sunrise !== null
                    ? `${sunrise}`
                    : "N/A"}
                </p>
              </div>

              <div className="sunset">
                <p>Sunset</p>
                <p>
                  {sunset !== undefined && sunset !== null
                    ? `${sunset}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="additional-data">
            <div className="detail uv">
              <p>UV Index</p>
              {uvIndex !== undefined && uvIndex !== null ? uvIndex : "N/A"}
            </div>

            <div className="detail wind-speed">
              <p>Wind Speed</p>
              {windSpeed !== undefined && windSpeed !== null
                ? `${windSpeed} km/h`
                : "N/A"}
            </div>

            <div className="detail clouds">
              <p>Cloud Cover</p>
              {cloudCover !== undefined && cloudCover !== null
                ? `${cloudCover}%`
                : "N/A"}
            </div>

            <div className="detail visibility">
              <p>Visibility</p>
              {visibility !== undefined && visibility !== null
                ? `${visibility} km`
                : "N/A"}
            </div>

            <div className="detail rain">
              <p>Rain</p>
              <p>
                {rain !== undefined && rain !== null ? `${rain} mm` : "N/A"}
              </p>
            </div>

            <div className="detail humidity">
              <p>Humidity</p>
              <p>
                {humidity !== undefined && humidity !== null
                  ? `${humidity}%`
                  : "N/A"}
              </p>
            </div>

            <div className="detail wind-direction">
              <p>Wind Direction</p>
              <p>
                {windDirection !== undefined && windDirection !== null
                  ? `${windDirection}°`
                  : "N/A"}
              </p>
            </div>

            <div className="detail pressure">
              <p>Pressure</p>
              {pressure !== undefined && pressure !== null
                ? `${pressure} mb`
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CityInfoOutput.propTypes = {
  cityWeatherData: PropTypes.shape({
    location: PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
      localtime: PropTypes.string,
    }),
    current: PropTypes.shape({
      last_updated: PropTypes.string,
      condition: PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
      }),
      temp_c: PropTypes.number,
      uv: PropTypes.number,
      wind_kph: PropTypes.number,
      cloud: PropTypes.number,
      vis_km: PropTypes.number,
      precip_mm: PropTypes.number,
      humidity: PropTypes.number,
      wind_degree: PropTypes.number,
      pressure_mb: PropTypes.number,
      feelslike_c: PropTypes.number,
    }),
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(
        PropTypes.shape({
          astro: PropTypes.shape({
            sunrise: PropTypes.string,
            sunset: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};
