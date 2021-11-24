const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require('axios');

let rawdata = fs.readFileSync('./auth/auth.json');
let auth = JSON.parse(rawdata);
const username = auth.email;
const password = auth.password;
const zendesk = `https://${auth.subdomain}.zendesk.com/`
// Home page route
router.get('/', function (req, res) {
    res.send('');
});

// About page route
router.get('/:ticketId', async function (req, res) {
    const id = req.params.ticketId;
    const url = zendesk + '/api/v2/tickets/' + id + ".json";
    try {
        const result = await axios.get(url, {
            auth: {
                username: username,
                password: password
            }
        });
        res.send(JSON.stringify(result.data))
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;