/**
 * Database model for events
 * @author Lixiao, Shengyang
 * @version v1.0
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Events = new Schema(
    {
        Title: {type: String, required: true, max: 100},
        Date: {type: Date, required: true},
        Lat: {type: String},
        Lng : {type : String},
        Author:{type:String, required: true, max: 100},
        Description: {type: String, required: true, max:100},
        Image: {type: String},
        whatever: {type: String} //any other field
    }
);

Events.set('toObject', {getters: true, virtuals: true});
Events.index({
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
var eventsModel = mongoose.model('Events', Events );

module.exports = eventsModel;