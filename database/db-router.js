var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var Database = require('./database.js');
var Promise = require('bluebird');
var config = require('./config');

var DbRouter = function (settings) {
    this._dbSettings = settings;
    this._dbHost = settings.host || "localhost";
    this._dbPort = settings.port || 27017;
    this._dbName = settings.name || "local";
    this._dbPath = "mongodb://" + this._dbHost + ":" + this._dbPort + "/" + this._dbName;
    this._db = null;
    this._collections = {};
};
DbRouter.prototype.connect = function () {
    var dbPath = this._dbPath;
    if (!dbPath)
        throw new Error('Missing database path');
    var self = this;
    return new Promise(function (resolve, reject) {
        //If conn already exist, return open DB conn
        if (self._db !== null) {
            return resolve(self._db);
        }
        MongoClient.connect(dbPath, (err, db)=> {
            if (err) {
                if (err.message.substr(0, 17) == "failed to connect") {
                    console.error('*********************************************************');
                    console.error('MONGODB WAS PROBABLY NOT STARTED. PLEASE START IT BEFORE!');
                    console.error('*********************************************************');
                }
                return reject(err);
            }
            self._db = new Database(db);
            return resolve(self._db);
        });
    });
};
DbRouter.prototype.disconnect = function(){
    var self = this;
    return new Promise((resolve, reject)=> {
        //TODO : Disconnect
        return resolve(true);
    });
};
//expose raw driver
DbRouter.prototype.mongodb = MongoDB;
module.exports = new DbRouter(config.mongo);