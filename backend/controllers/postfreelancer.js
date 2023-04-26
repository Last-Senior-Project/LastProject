const postfreelancer = require("../models/postfreelancer")
module.exports = {
    
    getAllPostfree: function(req, res) {
        postfreelancer.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    
    addPostfree: function(req, res) {
        postfreelancer.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(201).json(results)
        },req.body)
    },
    
    getPostfree: function(req, res) {
        postfreelancer.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idpostfreelancer])
    },

    deleteOne: function(req, res) {
        postfreelancer.deleted(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.params.idpostfreelancer])
    },
    updateOne: function(req, res) {
        postfreelancer.updatee(function(err, results) {
            if(err) res.status(500).send(err);
            else res.status(200).json(results)
        },[req.body,req.params.idpostfreelancer])
    },

}