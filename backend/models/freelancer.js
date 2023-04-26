const conn =require ('../database/index')
module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `freelancer`'
      conn.query(sql, function (error, results, fields) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM `freelancer` WHERE idFreelancer=(?)'
        conn.query(sql,id, function (error, results) {
          callback(error, results);
        });
      },
      getName: function(callback,name) {
        const sql = 'SELECT * FROM `freelancer` WHERE firstnamefreelancer=(?)'
        conn.query(sql,name, function (error, results) {
          callback(error, results);
        });
      },
      
      add: function (callback,data) {
          const sql = 'INSERT INTO freelancer SET ? '
          conn.query(sql,data, function (error, results) {
            callback(error, results);
          });
        },
        deleted: function (callback,id) {
          const sql = 'DELETE FROM freelancer WHERE idFreelancer=(?);'
          conn.query(sql,id, function (error, results) {
            callback(error, results);
          });
        },
        updatee:function (callback,id) {
          const sql = 'UPDATE freelancer set ? WHERE idFreelancer=?'
          conn.query(sql,id, function (error, results) {
            callback(error, results);
          });
        }
    };