const {MongoClient, ObjectID} = require('mongodb');

var UnsingleData = {};

const yichiDbAddress = 'mongodb://localhost:27017/YICHI';
const yichiDbName = 'YICHI';
const yichiDbAccount = 'account';
const yichiDbEvent = 'event';
const yichiDbMatch = 'match';


var yichiDb;
var yichiClient;


UnsingleData.verify = () => yichiDb !== null;

UnsingleData.connect = () => {
  MongoClient.connect(yichiDbAddress, (err, client) => {
    if(err) {
      throw err;
      return;
    }
    yichiDb = client.db(yichiDbName);
    yichiClient = client;
  });
};

UnsingleData.disconnect = () => {
  try{
    yichiClient.close();
  } catch(err) {
    throw(err);
  }
};










UnsingleData.getAccountById = (id, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbAccount).find({
      _id: new ObjectID(id)
    }).toArray().then(successCallback, failCallback);
  } catch(err) {
    if(err) throw err;
  }
};








UnsingleData.getAccountByUsername = (username, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbAccount).find({
      username
    }).toArray().then(successCallback, failCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.getAccountByGender = (gender, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbAccount).find({gender}).toArray().then(successCallback, failCallback);
  } catch(err) {
    throw(err);
  }
};


UnsingleData.getEventById = (id, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbEvent).find({ _id: new ObjectID(id) }).toArray().then(successCallback, failCallback);
  } catch(err) {
    throw(err);
  }
};


UnsingleData.getEventByTitle = (title, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ title }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};


UnsingleData.getEventByStartTime = (start_time, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ start_time }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.getEventByEndTime = (end_time, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ end_time }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.getEventByDescription = (description, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ description }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.getEventByLocation = (location, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ location }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.getEventByOwner = (owner, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ owner }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.getAllEvents = (callback, errCallback) => {
  try{
    yichiDb.collection(yichiDbEvent).find().toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.createAccount = (username, password, gender, callback) => {
  yichiDb.collection(yichiDbAccount).insertOne({ username, password, gender }, callback);
};

UnsingleData.createEvent = (title, location, start_time, end_time, description, owner, callback) => {
  yichiDb.collection(yichiDbEvent).insertOne({ title, start_time, end_time, description, location, owner }, callback);
};



// yichiDbMatch
UnsingleData.createMatch = (userId, eventId, callback) => {
  yichiDb.collection(yichiDbMatch).insertOne({ userId, eventId }, callback);
};

UnsingleData.getMatchById = (id, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbMatch).find({
      _id: new ObjectID(id)
    }).toArray().then(successCallback, failCallback);
  } catch(err) {
    if(err) throw err;
  }
};

UnsingleData.getMatchByEventId = (eventId, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbMatch).find({ eventId }).toArray().then(successCallback, failCallback);
  } catch(err) {
    if(err) throw err;
  }
};

UnsingleData.getMatchByUserId = (userId, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbMatch).find({ userId }).toArray().then(successCallback, failCallback);
  } catch(err) {
    if(err) throw err;
  }
};


module.exports = UnsingleData;
