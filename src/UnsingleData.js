const {MongoClient, ObjectID} = require('mongodb');
var UnsingleData = {};
const yichiDbAddress = 'mongodb://localhost:27017/YICHI';
const yichiDbName = 'YICHI';
const yichiDbAccount = 'account';
const yichiDbEvent = 'event';
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

UnsingleData.findAccountByGender = (gender, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbAccount).find({gender}).toArray().then(successCallback, failCallback);
  } catch(err) {
    throw(err);
  }
};


UnsingleData.findEventByObjectID = (id, successCallback, failCallback) => {
  try{
    yichiDb.collection(yichiDbEvent).find({ _id: new ObjectID(id) }).toArray().then(successCallback, failCallback);
  } catch(err) {
    throw(err);
  }
};


UnsingleData.findEventByTitle = (title, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ title }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};


UnsingleData.findEventByStartTime = (start_time, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ start_time }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.findEventByEndTime = (end_time, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ end_time }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.findEventByDescription = (description, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ description }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.findEventByLocation = (location, successCallback, failCallback) => {
  try{
    return yichiDb.collection(yichiDbEvent).find({ location }).toArray().then(callback, errCallback);
  } catch(err) {
    throw(err);
  }
};

UnsingleData.findEventByOwner = (owner, successCallback, failCallback) => {
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

UnsingleData.createEvent = (title, start_time, end_time, description, location, owner, callback) => {
  yichiDb.collection(yichiDbEvent).insertOne({ title, start_time, end_time, description, location, owner }, callback);
};

module.exports = UnsingleData;
