const ticket = require('../../routes/ticket');
const fs = require('fs');
const { expect } = require('@jest/globals');



describe('Test the generate links methods', () => {
    test('It should response the GET method', async () => {
        const zendesk = `https://subdomain.zendesk.com`;
        const req = {
            protocol: 'http',
            url: '/?page[size]=25&page[after]=A',
            get: (param) => param == 'host' ? 'localhost:8000' : ''
        };
        const query_params = '?page[size]=25&page[after]=A';
        const links = {
            next: `${zendesk}/api/v2/tickets.json${query_params}`
        }
        const response = ticket.generate_links(req, links, zendesk);
        expect(response.next_url).toBe('http://localhost:8000/?page[size]=25&page[after]=A');
        expect(response.view_url).toBe('http://localhost:8000/view/');
        expect(response.back_url).toBe('http://localhost:8000/');
    });
});