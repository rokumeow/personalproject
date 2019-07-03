/**
 * Database model for stories
 * @author Lixiao, Shengyang
 * @version v1.0
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Userstory = new Schema(
    {
        Title: {type: String, required: true, max: 100},
        Date: {type: Date, required: true},
        Author:{type:String, required: true, max: 100},
        Description: {type: String, required: true, max:100},
        Image: {type: String},
        Camera: {type:String},
        whatever: {type: String} //any other field//any other field
    }
);

Userstory.set('toObject', {getters: true, virtuals: true});
Userstory.index({
        Title: 'text',
        Description: 'text',
        Author: 'text'
}, {
        weights: {
                Title: 5,
                Description: 1,
                Author: 1
        }
});

var storyModel = mongoose.model('Userstory', Userstory );

module.exports = storyModel;