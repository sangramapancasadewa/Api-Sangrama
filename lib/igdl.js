const axios = require("axios");
const cheerio = require("cheerio");

async function igDownload(url) {
  const headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://idownloader.io',
    'referer': 'https://idownloader.io/',
    'cookie': 'PHPSESSID=easqd0d1ujiqf1arv4rsfm7jmd; _ga=GA1.1.1541970967.1691152140; __gads=ID=73d79b0404953e47-2265a0e8ace2005b:T=1691152143:RT=1691152143:S=ALNI_MZYOVK4CvhzBgX5BuYv0sXZH0dxqw; __gpi=UID=00000c26fe06658f:T=1691152143:RT=1691152143:S=ALNI_MbRhScE7mqlyPm-7jogXzFURPIFBA; _ga_6ZBFDSJZBL=GS1.1.1691152139.1.1.1691152367.60.0.0'
  };

  const data = `url=${url}&host=instagram`;

  const resp = await axios.post('https://idownloader.io/core/ajax.php', data, { headers });
  const $ = cheerio.load(resp.data);
  const links = [];
  $('a').each((index, element) => {
    links.push($(element).attr('href'));
  });
  const formattedLinks = links.map(link => `https://idownloader.io/${link}`);
  return formattedLinks;
}

module.exports = { igDownload }
