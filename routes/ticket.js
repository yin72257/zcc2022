const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require('axios');

let raw_data = fs.readFileSync('./auth/auth.json');
let auth = JSON.parse(raw_data);
const username = auth.email;
const password = auth.password;
const zendesk = `https://${auth.subdomain}.zendesk.com/`
// Home page route
router.get('/', function (req, res) {
    res.send('');
});

// About page route
router.get('/:ticket_id', async function (req, res) {
    const id = req.params.ticket_id;
    const url = `${zendesk}/api/v2/tickets/${id}.json`;
    try {
        const result = await axios.get(url, {
            auth: {
                username: username,
                password: password
            }
        });
        const user_url = `${zendesk}/api/v2/users/${result.data.ticket.requester_id}.json`;
        const requester = await axios.get(user_url, {
            auth: {
                username: username,
                password: password
            }
        });
        res.render('pages/ticket', {
            requester: requester.data.user.name,
            subject: result.data.ticket.raw_subject,
            description: result.data.ticket.description
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;