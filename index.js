'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const token = "EAAEgQVtqAQABABfCyzcchTnsff3Bng4vzMFPuUuvEoZCZCPE1bGeZCdZB1HgbMZC5EbmtwYv9we0cBBcZB0ID2T29E9xg0GkKRG1RZCo2LvSxXMgCGqK5IztLcCxjMB3fg9RnmibgxAMPcSlmdt6xaZBipFBfZAYFxh872ZBJAy8t6qAZDZD";

const sendTextMessage = (sender, text) => {
    let messageData = {text};
    axios.post(`https://graph.facebook.com/v2.6/me/messages?access_token=${token}`,
        {
            recipient: {id: sender},
            message: messageData,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.data.error) {
                console.log('Error', response.data.error)
            }
        }).catch((error) => {
            console.log('ERROR sending messages: ', error);
        });
}

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('CHARICE is ready to rock!');
});

app.get('/webhook/', (req, res) => {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text;
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
        }
    }
    res.sendStatus(200);
});

app.listen(app.get('port'), () => {
    console.log('running on port', app.get('port'));
});