var Userstory = require('../models/userstory');

/**
 * Database controller for stories
 * @author Lixiao
 * @param req, res
 * @return exported methods
 * @exception database IOException
 * @throws status 500 error
 * @version v1.0
 */
exports.insert = function (req, res) {
    console.log(req.body);
    var storyData = req.body;
    if (storyData == null) {
        res.status(403).send('No data sent!')
    }

    try {
        var story = new Userstory({
            Title: storyData.blog_title,
            Date: storyData.blog_date,
            Description: storyData.blog_description,
            Author:storyData.blog_author,
            Image: storyData.imagestring,
            Eventtag:storyData.tag1,
            Camera:""
        });
        console.log('received: ' + story);

        story.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(story));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}

/**
 * Database controller for stories
 * @author Lixiao
 * @param req, res, callback function
 * @return exported methods
 * @exception database IOException
 * @throws status 500 error
 * @version v1.0
 */
exports.addBlog= function (req, res, callback) {
    Userstory.find({},function (err,results) {
        console.log(err);
        console.log(results);
        callback(results);
    });
};

