import axios from "axios";
import weatherData from "./data/weather.json";

export const parse = async () => {
  const token = process.env.WEATHER_API_KEY;
  const city = "Seoul";

  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&units=metric`
  );
  const data = response.data;

  const response2 = await axios.get(
    `http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${token}&units=metric`
  );
  const data2 = response2.data;
  const forecast: Ihour[] = data2.hourly;

  console.log("✅ 날씨 파싱 완료");

  return {
    weather: (<any>weatherData)[data.weather[0].id],
    wind_speed: `${data.wind.speed}m/s`,
    temp: `${data.main.temp}도`,
    temp_min: `${data.main.temp_min}도`,
    temp_max: `${data.main.temp_max}도`,
    feels_like: `${data.main.feels_like}도`,
    pressure: `${data.main.pressure}파스칼(Pa)`,
    humidity: `${data.main.humidity}%`,
    forecast
  };
};

export interface Ihour {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  pop: number;
}
