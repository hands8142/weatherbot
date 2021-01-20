import axios from 'axios';
import { parser } from '../parser/speedName';

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
  };
  news: string;
  date: string;
  url: string;
}

export default async({ weather, news, date, url }: discordArgs) => {
  const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');
  const speedName = parser(Number(weather.wind_speed));

  let message: any = {
    username: "하루 시작봇",
    avatar_url: 'https://cdn.discordapp.com/attachments/683175932873539589/689459371151065088/message-3592640_1280.jpg',
    content:  `${today}의 하루 시작을 위한 정보를 알려드립니다.`,
    embeds: [],
  };

  message.embeds.push({
    color: 0x928BFF,
    fields: [
      {
        name: '📅 날짜 / 한국',
        value: `${today} ${date ? '(' + date + ')' : ''}`,
        inline: true
      },
      {
        name: '🏞️ 날씨 / 서울',
        value: weather.weather,
        inline: true
      },
      {
        name: '🌡 현재온도 / 서울',
        value: weather.temp,
        inline: true
      },
      {
        name: '🌡 채감온도 / 서울',
        value: weather.feels_like,
        inline: true
      },
      {
        name: '🌡 최고기온 / 서울',
        value: weather.temp_max,
        inline: true
      },
      {
        name: '🌡 최저기온 / 서울',
        value: weather.temp_min,
        inline: true
      },
      {
        name: '🍃 바람세기 / 서울',
        value: `${weather.wind_speed} ${speedName ? '(' + speedName + ')' : ''}`,
        inline: true
      },
      {
        name: '🗜 기압 / 서울',
        value: weather.pressure,
        inline: true
      },
      {
        name: '💧 습도 / 서울',
        value: weather.humidity,
        inline: true
      }
    ]
  });

  message.embeds.push({
    color: 0x928BFF,
    title: '📰 뉴스 / 구글',
    description: news
  });

  await axios.post(url, message);
};
