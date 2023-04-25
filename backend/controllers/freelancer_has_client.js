const {
  getclient,
  getWorker,
  addClientToFreelancer,
} = require("../models/freelancer_has_client");
module.exports = {
  getClient: (req, res) => {
    getclient(req.params.id, (err, client) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(client);
    });
  },
  addClient: (req, res) => {
    addClientToFreelancer(req.body, (err, client) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(client);
    });
  },
  getWorker: (req, res) => {
    getWorker(req.params.id, (err, worker) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(worker);
    });
  },
};
