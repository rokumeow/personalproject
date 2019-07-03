/**
 * Database model for comments
 * @author Lixiao, Shengyang
 * @version v1.0
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Comment = new Schema(
    {
        Name: {type: String, required: true, max: 100},
        Title: {type: String, required: true, max: 100},
        Comment: {type: String, required:true, max: 100},
        whatever: {type: String} //any other field
    }
);

Comment.set('toObject', {getters: true, virtuals: true});


var commentModel = mongoose.model('Comment', Comment);

module.exports = commentModel;