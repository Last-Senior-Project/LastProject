const { get, addEducation,deleteEducation } = require("../models/education");
module.exports = {
  get: (req, res) => {
    get((err, reslt) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(reslt);
    });
  },

  add: (req, res) => {
    addEducation(req.body, (err, reslt) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(reslt);
    });
  },
  deleteone:(req,res)=>{
    deleteEducation(req.params.ideducation,(err,reslt)=>{
        if (err) {
            res.status(500).send(err);
            return;
            }
            res.status(200).send(reslt);
            });

  }
};
