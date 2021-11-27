const handle_list = function (response) {
    const error_message = `${response.status} ${response.statusText}.`;
    let description = "Uh oh there seems to be an error.";
    if (response.status == '401') {
        description = 'There may be an authentication error in your auth/auth.json file.';
    }
    return {
        error: error_message,
        description: description
    };
}

const handle_ticket = function (response) {
    const error_message = `${response.status} ${response.statusText}.`;
    let description = "Uh oh there seems to be an error.";
    if (response.status == '401') {
        description = 'There may be an authentication error in your auth/auth.json file.';
    }
    if (response.status == '404') {
        description = 'This ticket does not seem to exist.';
    }
    if (response.status == '400') {
        description = 'Invalid input for ticket id.';
    }
    return {
        error: error_message,
        description: description
    };
}

module.exports.list_error = handle_list;
module.exports.ticket_error = handle_ticket;