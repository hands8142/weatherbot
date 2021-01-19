import axios from 'axios';

interface slackArgs {
  weather: {
    weather: string;
    temp: string;
    temp_min: string;
    temp_max: string;
  };
  news: string;
  date: string;

  url: string;
}

export default async({ weather, news, date, url }: slackArgs) => {
  const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');

  let message: any = {
    attachments: [],
  };

  message.attachments.push({
    color: '#928BFF',
    pretext: `📨 ${today} 편지가 왔어요!`,

    fields: [
      {
        title: '📅 날짜 / 한국',
        value: `${today} ${date ? '(' + date + ')' : ''}`,
        short: true,
      },
      {
        title: '🏞️ 날씨 / 부산',
        value: weather.weather,
        short: true,
      },
      {
        name: '🌡 현재온도 / 서울',
        value: weather.temp,
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
      }
    ]
  });

  message.attachments.push({
    // text: '<http://www.foo.com|This message *is* a link>',
    fields: [
      {
        type: 'mrkdwn',
        title: '📰 뉴스 / 구글',
        value: news,
      }
    ],
  });

  await axios.post(url, message);
};