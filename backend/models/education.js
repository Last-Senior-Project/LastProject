const conn = require("../database/index");
module.exports = {
  get: (callback) => {
    conn.query("select * from education", (err, reslt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, reslt);
      }
    });
  },
  addEducation: (education, callback) => {
    conn.query(
      "insert into education (institutiontype,domain,city,Freelancer_idFreelancer) values (?,?,?,?)",
      [
        education.institutiontype,
        education.domain,
        education.city,
        education.Freelancer_idFreelancer,
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
  //delete
  deleteEducation: (ideducation, callback) => {
    conn.query(
      "DELETE FROM education WHERE ideducation = ?",
      [ideducation],
      function (error, results) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      }
    );
  }}
