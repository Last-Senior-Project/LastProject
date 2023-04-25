const { getAll, getById, addPost } = require("../models/postClient");
module.exports = {
  get: (req, res) => {
    getAll((err, data) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(data);
    });
  },
  getById: (req, res) => {
    getById(req.params.idpostclient, (err, data) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(data);
    });
  },
  add: (req, res) => {
    addPost(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(data);
    });
  },
};
