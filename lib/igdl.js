const axios = require('axios');
const cheerio = require('cheerio');

function igStory(username) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'https://storydownloader.net/',
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"		
			}
		}).then(response => {
			const ch = cheerio.load(response.data)
			const token = ch('#token').attr('value')
			let data = {
				token: token,
				username: username,
				stp: 1
			}
			axios.request({
				url: 'https://storydownloader.net/process/',
				method: 'POST',
				data: new URLSearchParams(Object.entries(data)),
				headers: {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": response.headers["set-cookie"],
					"accept": "application/json, text/javascript, */*; q=0.01"
				}
			}).then(res => {
				const hc = cheerio.load(res.data.html)
				const medias = []
				hc('figure').each(function (a, b) {
					const url = hc(b).find('img').attr('src')
					medias.push(url)
				})
				const hasil = {
					title: hc('h1').text(),
					profile_pic: hc('img').attr('src'),
					medias: medias
				}
				resolve(hasil)
			}).catch(reject)
		}).catch(reject)
	})
}

module.exports = { igStory }
