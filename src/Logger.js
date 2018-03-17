function Logger() {
    this.debugMode = false;
}

Logger.prototype.log = function (msg) {
    if (this.debugMode) {
        console.log(msg);
    }
};

Logger.prototype.error = function (msg) {
    console.error(msg);
};

Logger.prototype.enableDebug = function () {
    this.debugMode = true;
};

Logger.prototype.disableDebug = function () {
    this.debugMode = false;
};

module.exports = Logger;
