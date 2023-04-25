const conn = require("../database/index");
module.exports = {
  getAll: (callback) => {
    conn.query("select * from postclient", function (err, reslt) {
      if (err) {
        callback(err);
      } else {
        callback(null, reslt);
      }
    });
  },
  getById: (idpostclient, callback) => {
    conn.query(
      "select * from postclient where idpostclient = ?",
      [idpostclient],
      function (err, reslt) {
        if (err) {
          callback(err);
        } else {
          callback(null, reslt);
        }
      }
    );
  },
  addPost: (post, callback) => {
    conn.query(
      "insert into postclient(titlepost,descriptionpost,imgpost,client_idclient) values(?,?,?,?)",
      [
        post.titlepost,
        post.descriptionpost,
        post.imgpost,
        post.client_idclient,
      ],
      (err, reslt) => {
        if (err) {
          callback(err);
        } else {
          callback(null, reslt);
        }
      }
    );
  },
};
