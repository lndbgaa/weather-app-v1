// tools
import { useState } from "react";

// components
import CityDataOutput from "./components/CityDataOutput/CityDataOutput";
import SearchCityInput from "./components/SearchCityInput/SearchCityInput";

// styles
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [isSearchValid, setIsSearchValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cityWeatherData, setCityWeatherData] = useState({});

  return (
    <main className="main-container">
      <SearchCityInput
        userInput={userInput}
        setUserInput={setUserInput}
        isSearchValid={isSearchValid}
        setIsSearchValid={setIsSearchValid}
        setIsLoading={setIsLoading}
        setCityWeatherData={setCityWeatherData}
      />

      {isSearchValid && !isLoading ? (
        <CityDataOutput cityWeatherData={cityWeatherData} />
      ) : null}
    </main>
  );
}

export default App;
