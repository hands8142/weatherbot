import axios from 'axios';

interface discordArgs {
  weather: {
    weather: string;
    temp: string;
  };
  news: string;
  date: string;

  url: string;
}

export default async({ weather, news, date, url }: discordArgs) => {
  const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');

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
        name: '🌡 온도 / 서울',
        value: weather.temp,
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
