const conn =require ('../database/index')
module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `experience`'
      conn.query(sql, function (error, results, fields) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM `experience` WHERE idexperience=(?)'
        conn.query(sql,id, function (error, results) {
          callback(error, results);
        });
      },
    
      
      add: function (callback,data) {
          const sql = 'INSERT INTO experience SET ? '
          conn.query(sql,data, function (error, results) {
            callback(error, results);
          });
        },
        deleted: function (callback,id) {
          const sql = 'DELETE FROM experience WHERE idexperience=(?);'
          conn.query(sql,id, function (error, results) {
            callback(error, results);
          });
        },
        updatee:function (callback,id) {
          const sql = 'UPDATE experience set ? WHERE idexperience=?'
          conn.query(sql,id, function (error, results) {
            callback(error, results);
          });
        }
    };