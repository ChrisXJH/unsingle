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
    if (req == null || req.params == null || req.params.userId == null) return null;
    else return req.params;
}

function validateCreateEventRequest(req) {
    if (req == null || req.body == null) return null;
    return req.body;
}

function validateGetEventRequest(req) {
    if (req == null || req.params == null || req.params.eventId == null) return null;
    else return req.params;
}

function validateGetRecentEventsRequest(req) {
    if (req == null) return null;
    else return req.body;
}

function validateGetReceivedMessageRequest(req) {
    if (req == null || req.params == null || req.params.userId == null) return null;
    else return req.params;
}

function validateSendMessageRequest(req) {
    if (req == null || req.params == null || req.params.userId == null || req.body == null || req.body.fromuserId == null || req.body.content == null) {
        return null;
    }
    else {
        var returnReq = req.body;
        returnReq.touserId = req.params.userId;
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

function vailidateMatchRequest(req) {
    return req.body;
}

// Implement endpoints here

// Account

router.post('/account', function (req, res) { // callbacked
    try {
        var validatedReq = validateCreateAccountRequest(req);
        if (validatedReq != null) {
            var username = validatedReq.username;
            var password = validatedReq.password;
            var gender = validatedReq.gender;
            unsingleBusiness.registerAccount(username, password, gender, (response) => {
              res.status(response.getStatus()).send(response.getBody());
            });
        } else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});



router.get('/account/:userId', function (req, res) { // callbacked
    try {
        var validatedReq = validateGetAccountRequest(req);

        if (validatedReq != null) {
            var userId = validatedReq.userId;
            unsingleBusiness.getAccountById(userId, (response) => {
              res.status(response.getStatus()).send(response.getBody());
            });
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

router.post('/event', function (req, res) { // callbacked
    try {
        var validatedReq = validateCreateEventRequest(req);
        if (validatedReq != null) {
            var title = validatedReq.title;
            var location = validatedReq.location != null ? validatedReq.location : '';
            var startTime = validatedReq.startTime != null ? validatedReq.startTime : '';
            var endTime = validatedReq.endTime != null ? validatedReq.endTime : '';
            var description = validatedReq.description != null ? validatedReq.description : '';
            var owner = validatedReq.owner != null ? validatedReq.owner : '';
            unsingleBusiness.createNewEvent(title, location, startTime, endTime, description, owner, (response) => {
              res.status(response.getStatus()).send(response.getBody());
            });
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/event', function (req, res) { // callbacked
    try {
        var validatedReq = validateGetRecentEventsRequest(req);
        if (validatedReq != null) {
            unsingleBusiness.getRecentEvents((response) => {
                res.status(response.getStatus()).send(response.getBody());
            });

        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);

        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.get('/event/:eventId', function (req, res) { // callbacked
    try {
        var validatedReq = validateGetEventRequest(req);
        if (validatedReq != null) {
            var eventId = validatedReq.eventId;
            console.log(eventId);
            unsingleBusiness.getEventById(eventId ,(response) => {
                res.status(response.getStatus()).send(response.getBody());
            });
        }
        else {
            res.status(BAD_REQUEST).send();
        }
    } catch (e) {
        Logger.error(e);
        res.status(INTERNAL_SERVER_ERROR).send();
    }
});

router.post('/match', function (req, res) { // callbacked
    try {
        var validatedReq = vailidateMatchRequest(req);
        if (validatedReq != null) {
            var userId = validatedReq.userId;
            var eventId = validatedReq.eventId;

            console.log(userId);
            console.log(eventId);

            unsingleBusiness.submitMatchRequest(userId, eventId, (response) => {
                res.status(response.getStatus()).send(response.getBody());
            });
        }
        else {
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

// Message

router.post('/account/:userId/message', function (req, res) {
    try {
        var validatedReq = validateSendMessageRequest(req);
        if (validatedReq != null) {
            var fromuserId = validatedReq.fromuserId;
            var touserId = validatedReq.touserId;
            var content = validatedReq.content;
            var response = unsingleBusiness.sendMessageToUser(fromuserId, touserId, content);

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

router.get('/account/:userId/message', function (req, res) {
    try {
        var validatedReq = validateGetReceivedMessageRequest(req);
        if (validatedReq != null) {
            var userId = validatedReq.userId;
            var response = unsingleBusiness.getReceivedMessagesByuserId(userId);
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

module.exports = router;
