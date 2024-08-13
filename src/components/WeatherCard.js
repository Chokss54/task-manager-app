import { Col, Row } from "react-bootstrap";
import '../App.css';
import { useState, useEffect } from "react";

const WeatherCard = () => {
  const [geolocation, setGeolocation] = useState({});
  // since we will only have one weather object, I think there's no need to create a weather class to store the data.
  const [weatherData, setWeatherData] = useState({});
  console.log("env obj: ", process.env)
  const apiKey = process.env.REACT_APP_WEATHER_API;

  const extractWeatherData = (dataJson) => {
    const { timezone } = dataJson;
    const { temp } = dataJson.current;
    const { main, icon } = dataJson.current.weather[0];

    const tempInC = convertTempToCelcius(temp);

    const extractedData = {
      timezone,
      tempInC,
      condition: main,
      icon,
    };

    setWeatherData(extractedData)
    console.log("data: ", weatherData)
  }

  const convertTempToCelcius = (tempInKelvin) => {
    return (tempInKelvin - 273).toFixed(2)
  }

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocation({ latitude, longitude });
      },
      (error) => {
        console.log("Error fetching user's geolocation: ", error);
      }
    );
  }

  const getWeatherAPI = async () => {
    try {
      if (!geolocation || !geolocation.latitude || !geolocation.longitude) {
        throw new Error("Geolocation data is not available.");
      }

      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${geolocation.latitude}&lon=${geolocation.longitude}&exclude=hourly,daily,minutely&appid=${apiKey}`

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response failure: ${response.status}`);
      }

      const dataResult = await response.json();
      return dataResult;

    } catch (error) {
      console.log("Error fetching weather api information: ", error);
    }
  }


  // get user location
  useEffect(() => {
    getGeolocation();
  }, []);

  // gets api only when geolocation changes
  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      const fetchWeatherData = async () => {
        const dataResponse = await getWeatherAPI()
        if (dataResponse) {
          extractWeatherData(dataResponse);
        }
      }

      fetchWeatherData();
      console.log(weatherData)

    }
  }, [geolocation]);


  return (
    <div className="p-4 weather-card">
      <Row >
        <Col>
          <div className="weather-condition">
            {weatherData.condition}
          </div>
          <div className="weather-temp">
            {weatherData.tempInC}°C
          </div>
          <div className="weather-location">
            {weatherData.timezone}
          </div>
        </Col>
        <Col className="d-flex align-items-center">
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} className="weather-icon"></img>
        </Col>
      </Row>
    </div>
  )
}

export default WeatherCard;
