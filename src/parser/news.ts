import axios from 'axios';
import cheerio from 'cheerio';

export const parse = async() => {
  const response = await axios.get('https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko'); // parsing new at google news

  const html: string = response.data;
  const $ = cheerio.load(html, { xmlMode: true });

  const titles: string[] = $('item > title').map((i, element) => $(element).text()).get();
  const links: string[] = $('item > link').map((i, element) => $(element).text()).get();

  let discordContent = '';
  let slackContent = '';

  for (let i = 0; i < 3; i++){
    discordContent += `[${titles[i]}](${links[i]})\n`;
    slackContent += `<${links[i]}|${titles[i]}>\n`;
  }
  
  console.log('✅ 뉴스 파싱 완료');

  return {
    discordContent,
    slackContent,
  };
}