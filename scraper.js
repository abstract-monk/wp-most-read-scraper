
// devtolist.js

// simple node webscraper 
// from tutorial by aurel kurtula
// https://dev.to/aurelkurtula/introduction-to-web-scraping-with-nodejs-9h2

// currently this scrapes user dev.to/1selfsolutions
// who wrote a series of 23 consecutive programming tutorials
// based in python


let axios        = require('axios');
let cheerio      = require('cheerio');
// let jsonframe = require('jsonframe-cheerio');
let fs           = require('fs');

// get content from dev.to user profile
axios.get('https://washingtonpost.com')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
	    const $    = cheerio.load(html);
            let devtolist = [];
	    $('.pm-content').each(function(i, elem) {
	        devtolist[i] = {
		    title: $(this).find('.headline').text().trim(),
		    url: $(this).children('a').attr('href')
          }
	    });
	    const devtolist_trimmed = devtolist.filter(n => n != undefined )
            fs.writeFile('scaper.json',
			  JSON.stringify(devtolist_trimmed, null, 4),
			  (err) => console.log('File successfully written!'))
	}
    }, (error) => console.log(err) );

