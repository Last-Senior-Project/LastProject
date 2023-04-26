const freelancer = require("../models/freelancer")
module.exports = {
    
    getAllFree: function(req, res) {
        freelancer.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    
    addFree: function(req, res) {
        freelancer.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(201).json(results)
        },req.body)
    },
    
    getOneFree: function(req, res) {
        freelancer.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idFreelancer])
    },

    getFreeName: function(req, res) {
        freelancer.getName(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.firstnamefreelancer])
    },

    deleteOne: function(req, res) {
        freelancer.deleted(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idFreelancer])
    },
    updateOne: function(req, res) {
        freelancer.updatee(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.body,req.params.idFreelancer])
    },

}