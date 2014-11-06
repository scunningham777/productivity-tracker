//var express = require('express');
//var router = express.Router();

/***********************************
 * FOR NOW, ALL DB OPERATIONS
 * SHOULD USE THE FOLLOWING USER ID:
 * 544d8ff19216375f8f23fade
 ***********************************/

/*
 * GET all sessions for the selected skill
 */
exports.list = function(req, res) {
	var db = req.db;
	var skillName = req.params.skillname;

//	db.collection('usercollection').findOne({_id: db.toObjectID('544d8ff19216375f8f23fade'), 'skills.name': skillName}, {'skills.$': 1}, function(err, result) {
    db.collection('usercollection').findOne({_id: db.toObjectID('544d92099216375f8f23fae0'), 'skills.name': skillName}, {'skills.$': 1}, function(err, result) {
		res.json(result.skills[0].sessions);
	});
};

/*
 * POST to add new session 
 */
exports.add = function(req, res) {
    var db = req.db;
    var skillName = req.params.skillname;
//    var userId = '544d8ff19216375f8f23fade';
    var userId = '544d92099216375f8f23fae0';
    db.collection('usercollection').update({_id: db.toObjectID(userId), 'skills.name': skillName}, {'$push': {"skills.$.sessions": req.body}}, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
};