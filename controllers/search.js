var Userstory = require('../models/userstory');
var Events = require('../models/events');
/**
 * Database controller for events
 * @author Shengyang
 * @param req, res, callback function
 * @return rearch results in blogs
 * @exception database IOException
 * @throws None
 * @version v1.0
 */
exports.inblog = function (req, res, callback) {
    //console.log("keyword");
    //console.log(req);
    var keywords = req;
    Userstory.find({$text: { $search: keywords }},function(err, results){
        console.log(err);
        //console.log("searchresults");
        //console.log(results);
        callback(results);
    });
};


/**
 * Database controller for events
 * @author Shengyang
 * @param req, res, callback function
 * @return rearch results in events
 * @exception database IOException
 * @throws None
 * @version v1.0
 */
exports.inevent = function (req, res, callback) {
    var keywords = req;
    Events.find({$text: { $search: keywords }},function(err, results){
        console.log(err);
        //console.log(results);
        callback(results);
    });
};
//console.log(Search.find({ $search: term }  ));
