var Promise = require('bluebird');
var ObjectID = require('mongodb').ObjectId;
var checkType = require('check-types');

var Collection = function(db, name, options) {
    var self = this;
    if (!db)
        throw new Error('No db argument');
    if (!name)
        throw new Error('No name argument');
    self._db = db;
    self._name = name;
    self._options = options || {};
    self._collection = self._db.collection(self._name);
    self._objectIds = self._options.ObjectIds || [];
    if (self._options.ObjectId)
        self._objectIds.push('_id');
};
var notImplementedPromise = function () {
    var self = this;
    return new Promise(function(resolve, reject){
        return reject(new Error('Not Implemented'));
    });
};
/* New methods having classic one deprecated */
Collection.prototype.insertOne = notImplementedPromise;
Collection.prototype.insertMany = notImplementedPromise;
Collection.prototype.bulkWrite = notImplementedPromise;
Collection.prototype.updateOne = notImplementedPromise;
Collection.prototype.updateMany = notImplementedPromise;
Collection.prototype.deleteOne = notImplementedPromise;
Collection.prototype.deleteMany = notImplementedPromise;
Collection.prototype.dropIndexes = notImplementedPromise;
Collection.prototype.findFirst = notImplementedPromise;
Collection.prototype.createIndex = notImplementedPromise;
Collection.prototype.findOneAndUpdate = notImplementedPromise;
Collection.prototype.findOneAndReplace= notImplementedPromise;
Collection.prototype.findOneAndDelete = notImplementedPromise;
Collection.prototype.find = function(query, fields, options) {
    var self = this;
    query = self.formatQuery(query);
    return new Promise(function(resolve, reject) {
        self._collection.find(query, fields, options).toArray(function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};
Collection.prototype.insert = function(docs, options) {
    var self = this;
    docs = self.formatQuery(docs);
    return new Promise(function(resolve, reject) {
        self._collection.insert(docs, options, function(err, docs) {
            if (err)
                return reject(err);
            return resolve(docs);
        });
    });
};
Collection.prototype.formatQuery = function(query) {
    var self = this;
    for (var i = 0; i < self._objectIds.length; i++) {
        if (query && query[self._objectIds[i]]) {
            query[self._objectIds[i]] = self.formatQueryType(query[self._objectIds[i]]);
        }
    }
    return query;
};
Collection.prototype.formatQueryType = function(obj) {
    var self = this;
    if (check.string(obj)) {
        return self.formatId(obj);
    } else if (check.array(obj)) {
        return self.formatObjectIds(obj);
    } else if (check.object(obj)) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = self.formatQueryType(obj[key]);
            }
        }
    }
    return obj;
};
Collection.prototype.formatObjectIds = function(objects) {
    var self = this;
    for (var i = 0; i < objects.length; i++) {
        objects[i] = self.formatId(objects[i]);
    }
    return objects;
};
Collection.prototype.formatId = function(hex) {
    var self = this;
    if (hex instanceof ObjectID)
        return hex;
    if (!hex || hex.length !== 24)
        return hex;
    return ObjectID.createFromHexString(hex);
};
module.exports = Collection;
