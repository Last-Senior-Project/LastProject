const {
  getAll,
  addClient,
  updateClient,
  deleteClient,
} = require("../models/client");
module.exports = {
  //get
  get: (req, res) => {
    getAll((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  //add
  add: (req, res) => {
    addClient(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  //update one clinet by id
  updateClient: function (req, res) {
    const idclient = req.params.idclient;
    const updatedclient = req.body;

    updateClient(
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Internal server error" });
        } else if (results.affectedRows === 0) {
          console.log("client not found");
          res.status(404).json({ error: "client not found" });
        } else {
          console.log("client updated successfully");
          res.status(200).json({ message: "client updated successfully" });
        }
      },
      updatedclient,
      idclient
    );
  },
  //delete client by id
  deleteClient: function (req, res) {
    const idclient = req.params.idclient;
    deleteClient(idclient, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else if (results.affectedRows === 0) {
        console.log("client not found");
        res.status(404).json({ error: "client not found" });
      } else {
        console.log("client deleted successfully");
        res.status(200).json({ message: "client deleted successfully" });
      }
    });
  },
};
