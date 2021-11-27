const express = require('express');
const fs = require('fs');
const axios = require('axios');
const url = require('url'); // built-in utility
const { list_error, ticket_error } = require('../error_handling/ticket_error');

const auth = JSON.parse(fs.readFileSync('./auth/auth.json'));
const auth_input = {
    username: auth.username,
    password: auth.password
};
const router = express.Router();
const zendesk = `https://${auth.subdomain}.zendesk.com`;

async function list_handle(req, res) {
    let page_size = 25;
    let list_url = `${zendesk}/api/v2/tickets.json?page[size]=`;
    if (req.query.page && req.query.page.size) {
        page_size = req.query.page.size;
    }
    list_url += page_size;
    if (req.query.page && req.query.page.after) {
        list_url += `&page[after]=${req.query.page.after}`;
    }
    const count_url = `${zendesk}/api/v2/tickets/count.json`;
    try {
        const result = await axios.get(list_url, {
            auth: auth_input
        });
        const count = await axios.get(count_url, {
            auth: auth_input
        });
        const links = generate_links(req, result.data.links);
        res.render('pages/list', {
            tickets: result.data.tickets,
            total: count.data.count.value,
            current: result.data.tickets.length,
            has_more: result.data.meta.has_more,
            next_url: links.next_url,
            view_url: links.view_url,
            back_url: links.back_url
        });
    } catch (err) {
        if (!err.response) {
            console.log(err);
            return;
        }
        res.render('pages/error', list_error(err.response));
    }
}

function generate_links(req, links) {
    const next_query_params = links.next ? links.next.replace(`${zendesk}/api/v2/tickets.json`, '') : '';
    const current_url = `${req.protocol}://${req.get('host')}`;
    const next_url = `${current_url}${url.parse(req.url).pathname}${next_query_params}`;
    const view_url = `${current_url}/view/`;
    const back_url = `${current_url}${url.parse(req.url).pathname}`;
    return {
        next_url: next_url,
        view_url: view_url,
        back_url: back_url
    };
}

async function view_ticket_handle(req, res) {
    const id = req.params.ticket_id;
    const ticket_url = `${zendesk}/api/v2/tickets/${id}.json`;
    try {
        const result = await axios.get(ticket_url, {
            auth: auth_input
        });
        const user_url = `${zendesk}/api/v2/users/${result.data.ticket.requester_id}.json`;
        const requester = await axios.get(user_url, {
            auth: auth_input
        });
        const back_url = `${req.protocol}://${req.get('host')}`;
        res.render('pages/ticket', {
            requester: requester.data.user.name,
            subject: result.data.ticket.raw_subject,
            description: result.data.ticket.description,
            back_url: back_url
        });
    } catch (err) {
        if (!err.response) {
            console.log(err);
            return;
        }
        res.render('pages/error', ticket_error(err.response));
    }
}

// Home page route
router.get('/', list_handle);
router.get('/view/:ticket_id', view_ticket_handle);

module.exports.router = router;
module.exports.generate_links = generate_links;
