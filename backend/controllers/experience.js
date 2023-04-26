const experience = require("../models/experience")
module.exports = {
    
    getAllExp: function(req, res) {
        experience.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    
    addExp: function(req, res) {
        experience.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(201).json(results)
        },req.body)
    },
    
    getOneExp: function(req, res) {
        experience.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idexperience])
    },

    deleteOne: function(req, res) {
        experience.deleted(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idexperience])
    },
    updateOne: function(req, res) {
        experience.updatee(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.body,req.params.idexperience])
    },

}