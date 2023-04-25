const conn = require("../database/index");
module.exports = {
  //getAll
  getAll: (callback) => {
    conn.query("SELECT * FROM client", (err, reslt) => {
      if (err) {
        callback(err);
      } else {
        callback(reslt);
      }
    });
  },
  //getById
  getById: (id, callback) => {
    conn.query("SELECT * FROM client WHERE id = ?", [id], (err, reslt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, reslt);
      }
    });
  },
  //addClient
  addClient: (client, callback) => {
    conn.query(
      "INSERT INTO client (firstnameclient, lastnameclient, emailclient, passwordclient, imgclient, birthclient) VALUES (?,?,?,?,?,?)",
      [
        client.firstnameclient,
        client.lastnameclient,
        client.emailclient,
        client.passwordclient,
        client.imgclient,
        client.birthclient,
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
  //updateClient
  updateClient: function (callback, data, idclient) {
    let query = "UPDATE client SET ";
    const keys = Object.keys(data);
    const values = Object.values(data);
    for (let i = 0; i < keys.length; i++) {
      query += `${keys[i]} = ?`;
      if (i !== keys.length - 1) {
        query += ", ";
      }
    }
    query += ` WHERE idclient = ?`;
    console.log("SQL Query:", query);
    conn.query(query, [...values, idclient], function (error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },
  //delete by id
  deleteClient: (idclient, callback) => {
    conn.query(
      "DELETE FROM client WHERE idclient = ?",
      [idclient],
      function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      }
    );
  },
};
