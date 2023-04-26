const rate = require("../models/rate")
module.exports = {
    
    getAllRate: function(req, res) {
        rate.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    
    addRate: function(req, res) {
        rate.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(201).json(results)
        },req.body)
    },
    
    getRate: function(req, res) {
        rate.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idrate])
    },

    deleteOne: function(req, res) {
        rate.deleted(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idrate])
    },
    updateOne: function(req, res) {
        rate.updatee(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.body,req.params.idrate])
    },

}