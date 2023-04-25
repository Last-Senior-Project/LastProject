const conn = require("../database/index");
module.exports = {
  getclient: (idclient, callback) => {
    conn.query(
      "SELECT * FROM client WHERE idclient = ?",
      [idclient],
      (err, client) => {
        if (err) {
          callback(err);
        } else {
          callback(null, client);
        }
      }
    );
  },
  getWorker: (idFreelancer, callback) => {
    conn.query(
      "select * from freelancer where idFreelancer=?",
      [idFreelancer],
      (err, worker) => {
        if (err) {
          callback(err);
        } else {
          callback(worker);
        }
      }
    );
  },
  //add client to freelancer has client
  addClientToFreelancer: (data,callback) => {
    conn.query(
      "INSERT INTO freelancer_has_client (idFreelancer, idclient) VALUES (?, ?)",
      [data.idFreelancer, data.idclient],
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
