const MongoClient = require('../../node_modules/mongodb').MongoClient;
const DBurl = 'mongodb://127.0.0.1:27017';
const dbName = 'smbm';

exports.ObjectId = require('mongodb').ObjectID;
/**
 * 数据库连接方法
 * @param callback
 * @private
 */
function _connect(callback) {
    new MongoClient.connect(DBurl,function (err,client) {
        if(err){console.log(err);return;}
        callback(client);
    })
}

/**
 * 查询数据库
 * @param table_name 表名
 * @param query 查询条件
 * @param callback  回调函数
 */
exports.find = function (table_name,query,callback) {
    _connect(function (client) {
        client.db(dbName).collection(table_name).find(query).toArray(function (err,data) {
            callback(err,data);
        })
    })
};
exports.pagination = function(table_name,query,start,pageSize,callback){
    _connect(function (client) {
        client.db(dbName).collection(table_name).find(query).skip(start).limit(pageSize)
            .toArray(function (err,data) {
                callback(err,data);
                client.close()
            })
    })
}
exports.count = function(table_name,query,callback){
    _connect(function (client) {
        client.db(dbName).collection(table_name).count(query,function (err,result) {
            callback(err,result);
            client.close()
        })
    })

}
/**
 * 新增数据
 * @param table_name
 * @param insert_data
 * @param callback
 */
exports.insertOne = function (table_name,insert_data,callback) {
    _connect(function (client) {
        client.db(dbName).collection(table_name).insertOne(insert_data,function (err,result) {
            callback(err,result);
            client.close();
        })
    })
};
/**
 * 删除数据
 * @param table_name
 * @param query
 * @param callback
 */
exports.removeOne = function (table_name,query,callback) {
    _connect(function (client) {
        client.db(dbName).collection(table_name).removeOne(query,function (err,result) {
            callback(err,result);
            client.close()
        })
    })
};
/**
 * 更新数据
 * @param table_name
 * @param query
 * @param modify_data
 * @param callback
 */
exports.updateOne = function (table_name,query,modify_data,callback) {
    _connect(function (client) {
        client.db(dbName).collection(table_name).updateOne(query,{$set:modify_data},function (err,result) {
            callback(err,result);
            client.close()
        })
    })
};