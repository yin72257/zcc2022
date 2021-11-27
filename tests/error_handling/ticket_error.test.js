const ticket_error = require('../../error_handling/ticket_error');

describe('Test the error handling of list', () => {
    test('It tests the response of a unauthorized 401 error', async () => {
        const res = {
            status: '401',
            statusText: 'Unauthorized'
        };
        const response = ticket_error.list_error(res);
        expect(response.error).toBe('401 Unauthorized.');
        expect(response.description).toBe('There may be an authentication error in your auth/auth.json file.');
    });

    test('It tests the response of a 404 error', async () => {
        const res = {
            status: '404',
            statusText: 'Not Found'
        };
        const response = ticket_error.list_error(res);
        expect(response.error).toBe('404 Not Found.');
        expect(response.description).toBe('Uh oh there seems to be an error.');
    });
});

describe('Test the error handling of view ticket', () => {
    test('It tests the response of a unauthorized 401 error', async () => {
        const res = {
            status: '401',
            statusText: 'Unauthorized'
        };
        const response = ticket_error.ticket_error(res);
        expect(response.error).toBe('401 Unauthorized.');
        expect(response.description).toBe('There may be an authentication error in your auth/auth.json file.');
    });

    test('It tests the response of a 404 error', async () => {
        const res = {
            status: '404',
            statusText: 'Not Found'
        };
        const response = ticket_error.ticket_error(res);
        expect(response.error).toBe('404 Not Found.');
        expect(response.description).toBe('This ticket does not seem to exist.');
    });

    test('It tests the response of a 404 error', async () => {
        const res = {
            status: '400',
            statusText: 'Bad Request'
        };
        const response = ticket_error.ticket_error(res);
        expect(response.error).toBe('400 Bad Request.');
        expect(response.description).toBe('Invalid input for ticket id.');
    });

    test('It tests the response of a 500 error', async () => {
        const res = {
            status: '503',
            statusText: 'Service Unavailable'
        };
        const response = ticket_error.ticket_error(res);
        expect(response.error).toBe('503 Service Unavailable.');
        expect(response.description).toBe('Uh oh there seems to be an error.');
    });
});