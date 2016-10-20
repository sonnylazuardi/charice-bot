'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('CHARICE is ready to rock!');
});

app.get('/webhook/', (req, res) => {
    if (req.query('hub.verify_token') == 'charice_will_win_c4tk') {
        res.send(req.query('hub.challenge'))
    }
    res.send('Error, wrong token');
});

app.listen(app.get('port'), () => {
    console.log('running on port', app.get('port'));
});