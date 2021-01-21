import axios from "axios";
import { parser } from "../parser/speedName";
import moment from "moment-timezone";
import { Ihour } from "../parser/weather";
import weatherData from "../parser/data/weather.json";

interface discordArgs {
  weather: {
    weather: string;
    wind_speed: string;
    temp: string;
    temp_min: string;
    temp_max: string;
    feels_like: string;
    pressure: string;
    humidity: string;
    forecast: Ihour[];
  };
  news: string;
  date: string;
  url: string;
}

export default async ({ weather, news, date, url }: discordArgs) => {
  const today = new Date()
    .toLocaleDateString()
    .replace(/\. /g, "-")
    .replace(".", "");
  const speedName = parser(
    Number(Number(weather.wind_speed.split("m/s")[0]).toFixed(1)) * 10
  );

  let message: any = {
    username: "하루 시작봇",
    avatar_url:
      "https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg",
    content: `${today}의 하루 시작을 위한 날씨를 알려드립니다.`,
    embeds: [],
  };

  message.embeds.push({
    color: 0x928bff,
    fields: [
      {
        name: "📅 날짜 / 한국",
        value: `${today} ${date ? "(" + date + ")" : ""}`,
        inline: true,
      },
      {
        name: "🏞️ 날씨 / 서울",
        value: weather.weather,
        inline: true,
      },
      {
        name: "🌡 현재온도 / 서울",
        value: weather.temp,
        inline: true,
      },
      {
        name: "🌡 채감온도 / 서울",
        value: weather.feels_like,
        inline: true,
      },
      {
        name: "🌡 최고기온 / 서울",
        value: weather.temp_max,
        inline: true,
      },
      {
        name: "🌡 최저기온 / 서울",
        value: weather.temp_min,
        inline: true,
      },
      {
        name: "🍃 바람세기 / 서울",
        value: `${weather.wind_speed} ${
          speedName ? "(" + speedName + ")" : ""
        }`,
        inline: true,
      },
      {
        name: "🗜 기압 / 서울",
        value: weather.pressure,
        inline: true,
      },
      {
        name: "💧 습도 / 서울",
        value: weather.humidity,
        inline: true,
      },
    ],
  });

  let message2: any = {
    username: "하루 시작봇",
    avatar_url:
      "https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg",
    content: `${today}의 하루 시작을 위한 날씨 예측를 알려드립니다.`,
    embeds: [],
  };

  message2.embeds.push({
    color: 0x928bff,
    fields: [],
  });

  for (let i = 0; i < 9; i++) {
    message2.embeds[0].fields.push({
      name: `🌡 ${unixformatDate(weather.forecast[i].dt)}온도 / 서울`,
      value:
        (<any>weatherData)[weather.forecast[i].weather[0].id] +
        ", " +
        weather.forecast[i].temp + 
        "도",
      inline: true,
    });
  }

  let message3: any = {
    username: "하루 시작봇",
    avatar_url:
      "https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg",
    content: `${today}의 하루 시작을 위한 뉴스를 알려드립니다.`,
    embeds: [],
  };

  message3.embeds.push({
    color: 0x928bff,
    title: "📰 뉴스 / 구글",
    description: news,
  });

  await axios.post(url, message);
  await axios.post(url, message2);
  await axios.post(url, message3);
};

function unixformatDate(date: number) {
  const data = moment(date * 1000).tz("Asia/Seoul");
  return data.date() + "일 " + data.hours() + "시 ";
}
