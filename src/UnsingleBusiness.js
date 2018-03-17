const unsingleData = require('./UnsingleData.js');
const businessResponse = require('./BusinessResponse.js');

const OK = 200;
const NO_CONTENT = 201;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

var UnsingleBusiness = {};;

// Implement business logic here

unsingleData.connect();


UnsingleBusiness.registerAccount = function (userName, password, gender, callback) {
    unsingleData.createAccount(userName, password, gender, (err, result) => {
        if(err) throw err;
        if (unsingleData.verify()) callback(businessResponse.builder().status(OK).body(result.ops[0]._id).build());
        else callback(businessResponse.builder().status(INTERNAL_SERVER_ERROR).body({"message": "INTERNAL_SERVER_ERROR"}).build());
    });
    // TODO: avoid duplicated user
};


UnsingleBusiness.getAccountById = function (accountId, callback) {
    unsingleData.getAccountById(accountId, (res) => {
        if (unsingleData.verify()) callback(businessResponse.builder().status(OK).body(res[0]).build());
        callback(businessResponse.builder().status(INTERNAL_SERVER_ERROR).body({"message": "INTERNAL_SERVER_ERROR"}).build())
    },
    () => callback(businessResponse.builder().status(NOT_FOUND).body({"message": "NOT_FOUND"}).build()));
};


UnsingleBusiness.createNewEvent = function (title, location, startTime, endTime, description, owner, callback) {
    unsingleData.createEvent(title, location, startTime, endTime, description, owner, (err, result) => {
        if(err) throw err;
        console.log(result.ops[0]);
        if (unsingleData.verify()) {
            callback(businessResponse.builder().status(OK).body(result.ops[0]._id).build());
        }
        else  {
            callback(businessResponse.builder().status(INTERNAL_SERVER_ERROR).body({"message": "INTERNAL_SERVER_ERROR"}).build());
        }
    });
    // TODO: avoid duplicated user
};


UnsingleBusiness.getRecentEvents = function (callback) {
    if (unsingleData.verify()) {
        unsingleData.getAllEvents(function (response) {
             callback(businessResponse.builder().status(OK).body(response).build());
        }, function () {

        });
    }
    else {
        callback(businessResponse.builder().status(INTERNAL_SERVER_ERROR).body({"message": "INTERNAL_SERVER_ERROR"}).build());
    }
};



UnsingleBusiness.getEventById = function (eventId) {
    return businessResponse.builder().status(OK).body({"title": "midterm"}).build();
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

UnsingleBusiness.startSession = function (username, password) {
    return businessResponse.builder().status(OK).body({"sessionId": "12345"}).build();
}

UnsingleBusiness.submitMatchRequest = function (acocunId, eventId, callback) {

}

module.exports = UnsingleBusiness;
