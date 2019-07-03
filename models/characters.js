/**
 * Database model for userstories
 * @author Lixiao, Min
 * @version v1.0
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Character = new Schema(
    {
        user_name: {type: String, required: true, max: 100},
        user_password: {type: String, required: true, max: 100},
        email: {type: String, required:true},
        whatever: {type: String} //any other field//any other field
    }
);

Character.set('toObject', {getters: true, virtuals: true});
Character.index({
    Title: 'user_name'
});

var characterModel = mongoose.model('Character', Character );

module.exports = characterModel;