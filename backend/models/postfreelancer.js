const conn =require ('../database/index')
module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `postfreelancer`'
      conn.query(sql, function (error, results, fields) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM `postfreelancer` WHERE idpostfreelancer=(?)'
        conn.query(sql,id, function (error, results) {
          callback(error, results);
        });
      },
    
      
      add: function (callback,data) {
          const sql = 'INSERT INTO postfreelancer SET ? '
          conn.query(sql,data, function (error, results) {
            callback(error, results);
          });
        },
        deleted: function (callback,id) {
          const sql = 'DELETE FROM postfreelancer WHERE idpostfreelancer=(?);'
          conn.query(sql,id, function (error, results) {
            callback(error, results);
          });
        },
        updatee:function (callback,id) {
          const sql = 'UPDATE postfreelancer set ? WHERE idpostfreelancer=?'
          conn.query(sql,id, function (error, results) {
            callback(error, results);
          });
        }
    };