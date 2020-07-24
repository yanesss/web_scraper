const axios = require('axios').default;
const { webhook } = require('../data');

const sendToDiscord = (title, price, link, img) => {
    const product = {
        "username": "Funko Notifier",
        "avatar_url": "https://i.imgur.com/4M34hi2.png",
        "content": "Newest Funko Pop Available Now!",
        "embeds": [{
                "title": `${ title }`,
                "url": `${ link }`,
                "color": 15258703,
                "fields": [
                    {
                        "name": "**Price**",
                        "value": `${ price }`,
                        "inline": true
                    },
                    {
                        "name": "\u200B",
                        "value": "\u200B",
                        "inline": true
                    },
                    {
                        "name": "**Stock**",
                        "value": "In Stock",
                        "inline": true
                    },
                    {
                        "name": "**Type**",
                        "value": "New Product",
                        "inline": true
                        
                    },
                    {
                        "name": "\u200B",
                        "value": "\u200B",
                        "inline": true
                    },
                    {
                        "name": "**Link**",
                        "value": `[Link]${ link }`,
                        "inline": true
                    }
                ],
                // "thumbnail": {
                //     "url": `${ img }`
                // }
            }]
        };
   
        // Send to discord
        axios.post(webhook, product)
        .then(res => {
            console.log(res);
        })
        .catch(function(error) {
            console.log(error);
        })
}

module.exports = sendToDiscord;