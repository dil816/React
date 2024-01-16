import { useEffect, useState } from "react";

function MyComponent() {
  const apiKey = "9d01f5ea97d45f73c4fc7557b27cf0cd";
  const [city, setCity] = useState("elpitiya");
  const [search, setSearch] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        if (!response.ok) {
          setWeatherdata("");
          throw new Error("not fetched");
        }
        if (active) {
          const data = await response.json();
          setWeatherdata(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }

      return () => {
        active = false;
      };
    }
    fetchData();
  }, [city]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function addNewCity() {
    if (search !== "") {
      setCity(search);
      setSearch("");
    }
  }

  return (
    <>
      <div className="detail-panel">
        <div>
          <input
            type="text"
            value={search}
            placeholder="Enter city"
            className="cityInput"
            onChange={handleSearch}
          />
          <button onClick={addNewCity}>search</button>
        </div>
        {weatherdata ? (
          <>
            <p className="countrydis">{weatherdata.sys.country}</p>
            <h1 className="citydis">{weatherdata.name}</h1>
            <p className="tempdis">
              {(weatherdata.main.temp - 273.15).toFixed(1)}℃
            </p>
            <p className="humidis">Humidity: {weatherdata.main.humidity}%</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p className="descdis">{weatherdata.weather[0].description}</p>

            <p className="sunricedis">
              Sunrice:{" "}
              {new Date(weatherdata.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="sunsetdis">
              Sunset:{" "}
              {new Date(weatherdata.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </>
        ) : (
          <p className="errordis">city not available</p>
        )}
      </div>
    </>
  );
}

export default MyComponent;
