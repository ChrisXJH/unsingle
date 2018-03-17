const express = require('express');
const unsingleBusiness = require('./UnsingleBusiness.js');
const MyLogger = require('./Logger.js');
const router = express.Router();
const Logger = new MyLogger();
Logger.enableDebug();

const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;


function validateCreateAccountRequest(req) {
    if (req == null || req.body == null || req.body.username == null || req.body.password == null) return null;
    else return req.body;
}

function validateGetAccountRequest(req) {
    if (req == null || req.params == null || req.params.accountId == null) return null;
    else return req.params;
}

function validateCreateEventRequest(req) {
    if (req == null || req.body == null || req.body.eventName == null || req.body.startTime == null) return null;
    else return req.body;
}

function validateGetEventRequest(req) {
    if (req == null || req.params == null || req.params.eventId == null) return null;
    else return req.params;
}

function validateGetRecentEventsRequest(req) {
    if (req == null || req.params == null) return null;
    else return req.params;
}

function validateGetReceivedMessageRequest(req) {
    if (req == null || req.params == null || req.params.accountId == null) return null;
    else return req.params;
}

function validateSendMessageRequest(req) {
    if (req == null || req.params == null || req.params.accountId == null || req.body == null || req.body.fromAccountId == null || req.body.content == null) {
        return null;
    }
    else {
        var returnReq = req.body;
        returnReq.toAccountId = req.params.accountId;
        return returnReq;
    }
}

function validateUpdateEventRequest(req) {
    if (req == null || req.body == null || req.params == null || req.params.eventId == null) {
        return null;
    }
    else {
        var returnReq = req.body;
        returnReq.eventId = req.params.eventId;
        return returnReq;
    }
}

function validateStartSessionRequest(req) {
    if (req == null || req.body == null || req.body.userName == null || req.body.password == null) return null;
    else return req.body;
}

// Implement endpoints here

// Account

router.post('/account', function (req, res) {
    try {
        var validatedReq = validateCreateAccountRequest(req);

        if (validatedReq != null) {
            var username = validatedReq.username;
            var password = validatedReq.password;

            var response = unsingleBusiness.registerAccount(username, password);
            res.status(response.getStatus()).send(response.getBody());

        } else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.post('/startSession', function (req, res) {
    try {
        var validatedReq = validateStartSessionRequest(req);

        if (validatedReq != null) {
            var userName = validatedReq.userName;
            var password = validatedReq.password;

            var response = unsingleBusiness.startSession(userName, password);
            res.status(response.getStatus()).send(response.getBody());

        } else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/account/:accountId', function (req, res) {
    try {
        var validatedReq = validateGetAccountRequest(req);

        if (validatedReq != null) {
            var accountId = validatedReq.accountId;
            var response = unsingleBusiness.getAccountById(accountId);
            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});


// Event

router.post('/event', function (req, res) {
    try {
        var validatedReq = validateCreateEventRequest(req);
        console.log(validatedReq);
        if (validatedReq != null) {
            var eventName = validatedReq.eventName;
            var location = validatedReq.location != null ? validatedReq.location : '';
            var startTime = validatedReq.startTime != null ? validatedReq.startTime : '';
            var endTime = validatedReq.endTime != null ? validatedReq.endTime : '';
            var description = validatedReq.description != null ? validatedReq.description : '';
            var response = unsingleBusiness.createNewEvent(eventName, location, startTime, endTime, description);

            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/event', function (req, res) {
    try {
        var validatedReq = validateGetRecentEventsRequest(req);
        if (validatedReq != null) {
            var response = unsingleBusiness.getRecentEvents();
            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);

        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/event/:eventId', function (req, res) {
    try {
        var validatedReq = validateGetEventRequest(req);
        if (validatedReq != null) {
            var eventId = validatedReq.eventId;
            var response = unsingleBusiness.getEventById(eventId);
            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);

        res.status(INTERNAL_SERVER_ERROR).send();
    }
});


router.put('/event/:eventId', function (req, res) {
    try {
        var validatedReq = validateUpdateEventRequest(req);
        if (validatedReq != null) {
            var eventId = validatedReq.eventId;
            var location = validatedReq.location != null ? validatedReq.location : '';
            var startTime = validatedReq.startTime != null ? validatedReq.startTime : '';
            var endTime = validatedReq.endTime != null ? validatedReq.endTime : '';
            var description = validatedReq.description != null ? validatedReq.description : '';
            var response = unsingleBusiness.updateEventById(eventId, location, startTime, endTime, description);

            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);

        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

// Message

router.post('/account/:accountId/message', function (req, res) {
    try {
        var validatedReq = validateSendMessageRequest(req);
        if (validatedReq != null) {
            var fromAccountId = validatedReq.fromAccountId;
            var toAccountId = validatedReq.toAccountId;
            var content = validatedReq.content;
            var response = unsingleBusiness.sendMessageToUser(fromAccountId, toAccountId, content);

            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/account/:accountId/message', function (req, res) {
    try {
        var validatedReq = validateGetReceivedMessageRequest(req);
        if (validatedReq != null) {
            var accountId = validatedReq.accountId;
            var response = unsingleBusiness.getReceivedMessagesByAccountId(accountId);
            res.status(response.getStatus()).send(response.getBody());
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});


module.exports = router;
