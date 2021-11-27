const request = require('supertest');
const app = require('../app');
const { expect } = require('@jest/globals');

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('It should response the GET method with 30 elements on each page', async () => {
        const response = await request(app).get('/?page[size]=30');
        expect(response.statusCode).toBe(200);
    });

    test('It should response the GET method Erro with invalid page[after]', async () => {
        const response = await request(app).get('/?page[after]=A');
        expect(response.statusCode).toBe(200);
    });

});

describe('Test viewing individual tickets', () => {
    test('It should respond with the valid individual ticket', async () => {
        const ticket_id = 1;
        const response = await request(app).get(`/view/${ticket_id}`);
        expect(response.statusCode).toBe(200);
    });

    test('It should respond with error that ticket is invalid', async () => {
        const ticket_id = 'A';
        const response = await request(app).get(`/view/${ticket_id}`);
        expect(response.statusCode).toBe(200);
    });

    test('It should respond with error that ticket does not exist', async () => {
        const ticket_id = 10000;
        const response = await request(app).get(`/view/${ticket_id}`);
        expect(response.statusCode).toBe(200);
    });
});