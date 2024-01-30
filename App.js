import React, { useState } from "react";
import "./App.css";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
function App() {




  const [data, setData] = useState({
    celcius: 10,
    name: "london",
    humidity: 10,
    speed: 2,
    image: "",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState();

  const handleClick = () => {
    if (name !== "") {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=33a953fc6805e5de3675faf131785ab4&&units=metric`;

      axios.get(api)
        

        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main === "Cloud") {
            imagePath = "/pic/cloud.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/pic/rain.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/pic/clear.png";
          } else if (res.data.weather[0].main === "Snow") {
            imagePath = "/pic/snow.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/pic/drizzle.png";
          } else {
            imagePath = "/pic/cloud.png";
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          }
        });
    }
  };
  return (
    <>
      <div className="container ">
        <div className="weather">
          <div className="search">
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button>
              <CiSearch onClick={handleClick} />
            </button>
          </div>
          <div className="error">
            <p>{error}</p>
          </div>
          <div className="info">
            <img src={data.image} alt="" />
            <h1 className="text-white">{Math.round(data.celcius)}°C</h1>
            <h2 className="text-white">{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src="/pic/humidity.png" alt="" />
                <div className="humidity">
                  <p className="text-white">{Math.round(data.humidity)}%</p>
                  <p className="text-white">Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="/pic/wind.png" alt="" />
                <div className="wind">
                  <p className="text-white">{Math.round(data.speed)}km/h</p>
                  <p className="text-white">Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
