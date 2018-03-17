const unsingleData = require('./UnsingleData.js');
const businessResponse = require('./BusinessResponse.js');

const OK = 200;
const NO_CONTENT = 201;

var UnsingleBusiness = {};;

// Implement business logic here

UnsingleBusiness.registerAccount = function (userName, password, gender) {
    return businessResponse.builder().status(OK).body({"accountId": "12345"}).build();
};

UnsingleBusiness.getAccountById = function (accountId) {
    return businessResponse.builder().status(OK).body({"accountId": accountId}).build();
};

UnsingleBusiness.createNewEvent = function (eventName, location, startTime, endTime, description) {
    return businessResponse.builder().status(OK).body({"eventId": "12345"}).build();
};

UnsingleBusiness.getRecentEvents = function () {
    return businessResponse.builder().status(OK).body([{"eventName": "midterm"}, {"eventName": "final"}]).build();
};

UnsingleBusiness.getEventById = function (eventId) {
    return businessResponse.builder().status(OK).body({"eventName": "midterm"}).build();
};

UnsingleBusiness.sendMessageToUser = function (from, to, content) {
    return businessResponse.builder().status(NO_CONTENT).build();
};

UnsingleBusiness.getReceivedMessagesByAccountId = function (accountId) {
    return businessResponse.builder().status(OK).body([{"messageId": "12345"}, {"messageId": "45679"}]).build();
};

UnsingleBusiness.updateEventById = function (eventId, location, startTime, endTime, description) {
    return businessResponse.builder().status(NO_CONTENT).build();
}

module.exports = UnsingleBusiness;
