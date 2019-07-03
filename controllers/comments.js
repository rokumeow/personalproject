var Comment = require('../models/comments');

/**
 * Database controller for comments
 * @author Lixiao
 * @param commentData
 * @return exported methods
 * @exception database IOException
 * @throws status 500 error
 * @version v1.0
 */
exports.insert = function (commentData) {
    // console.log(jsondata);

    try {
        var comment = new Comment({
            Title: commentData["title"],
            Name: commentData["name"],
            Comment: commentData["comment"]
        });
        console.log('received: ' + comment);

        comment.save(function (err, results) {
            console.log(results._id);
            /*if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comment));*/
        });
    } catch (e) {
        // res.status(500).send('error ' + e);
        console.log(e);
    }
};

/**
 * Database controller for comments
 * @author Min
 * @param req,res,callback
 * @return all comments retreated
 * @exception database IOException
 * @throws None
 * @version v1.0
 */
exports.addComment= function (req, res, callback) {
    Comment.find({},function (err,results) {
        // console.log(err);
        // console.log(results);
        callback(results);
    });
};
