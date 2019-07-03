var Character = require('../models/characters');

/**
 * Database controller for users
 * @author Lixiao
 * @param req, res, callback function
 * @return exported methods
 * @exception database IOException
 * @throws status 500 error
 * @version v1.0
 */
exports.insert = function (req, res) {
    console.log(req.body);
    var userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    try {
        var characters = new Character({
            user_name: userData.register_username,
            user_password: userData.register_password,
            email: userData.inputEmail
        });
        console.log('received: ' + characters);

        characters.save(function (err, results) {
            console.log(results._id);
            if (err)
                res.status(500).send('Invalid data!');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(characters));
        });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
};


/**
 * Retrive loin data by username
 * @author Shengyang
 * @param req,res,callback
 * @return password of the user
 * @exception database IOException
 * @throws None
 * @version v1.0
 */
exports.login = function (req, res, callback) {
    var username = req;
    Character.find({$text: { $search: username }},function(err, results){
        console.log(results);
        callback(results);
    });
};
