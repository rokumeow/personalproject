var Events = require('../models/events');

/**
 * Database controller for events
 * @author Lixiao
 * @param req, res, callback function
 * @return exported methods
 * @exception database IOException
 * @throws status 500 error
 * @version v1.0
 */
exports.insert = function (req, res) {
    console.log(req.body);
    var eventData = req.body;
    if (eventData == null) {
        res.status(403).send('No data sent!')
    }

    try {
        var events = new Events({
            Title: eventData.event_title,
            Date: eventData.event_date,
            Lat: eventData.event_Lat,
            Lng: eventData.event_Lng,
            Author: eventData.event_author,
            Description: eventData.event_description,
            Image: eventData.imagestring
        });
        console.log('received: ' + events);

        events.save(function (err, results) {
             console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(events));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

/**
 * Database controller for events
 * @author Min
 * @param req,res,callback
 * @return all events retreated
 * @exception database IOException
 * @throws None
 * @version v1.0
 */
exports.addEvent = function (req, res, callback) {
    Events.find({},function (err,results) {
        console.log(err);
        console.log(results);
        callback(results);
    });
};
