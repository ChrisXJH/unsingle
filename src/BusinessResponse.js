function BusinessResponse() {

    this.status = null;

    this.body = {};

}

function BusinessResponseBuilder() {

    this.serviceResponse = new BusinessResponse();

}

BusinessResponse.prototype.setStatus = function (status) {
    this.status = status;
};

BusinessResponse.prototype.setBody = function (body) {
    this.body = body;
};

BusinessResponse.builder = function () {
    return new BusinessResponseBuilder();
};

BusinessResponse.prototype.getStatus = function () {
    return this.status;
};

BusinessResponse.prototype.getBody = function () {
    return this.body;
};

BusinessResponseBuilder.prototype.build = function () {
    return this.serviceResponse;
};


BusinessResponseBuilder.prototype.status = function (status) {
    this.serviceResponse.setStatus(status);
    return this;
};

BusinessResponseBuilder.prototype.body = function (body) {
    this.serviceResponse.setBody(body);
    return this;
};

module.exports = BusinessResponse;
