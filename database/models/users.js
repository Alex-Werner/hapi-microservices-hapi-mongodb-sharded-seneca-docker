const DbRouter = require('../db-router.js');
const ce = require('khal').ce;
const cl = require('khal').cl;

var Users = {
    search: (query, fields, options)=> {
        if (!options) options = {};
        if (!fields) fields = {};
        return new Promise((resolve, reject)=> {
            DbRouter
                .connect()
                .then((db)=> {
                    var _usersColl = db.collection('users');
                    return _usersColl
                        .find(query, fields, options)
                        .then((result)=> {
                            return resolve(result)
                        })
                        .catch((e)=> {
                            return reject(ce(e))
                        });
                });
        });
    },
    create: (user)=> {
        if (!user) throw new Error('No user passed in args for create method');
        return new Promise(function (resolve, reject) {
            DbRouter
                .connect()
                .then((db)=> {
                    var _usersColl = db.collection('users');
                    return _usersColl
                        .insert(user)
                        .then((result)=> {
                            return resolve(result)
                        })
                        .catch((e)=> {
                            return reject(ce(e))
                        });
                })
        })
    },
    remove: (query)=> {
        if (!query) throw new Error('No query passed in args for remove method');
        return new Promise(function (resolve, reject) {
            DbRouter
                .connect()
                .then((db)=> {
                    var _usersColl = db.collection('users');
                    cl('Use of deprecate remove, please use deleteOne or deleteMany instead');
                    return _usersColl
                        .remove(query)
                        .then((result)=> {
                            return resolve(result)
                        })
                        .catch((e)=> {
                            return reject(ce(e))
                        });
                })
        })
    }
};
module.exports = Users;