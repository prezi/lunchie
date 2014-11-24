// # collect.js #

// ## Functions to process and reserve the incoming lunch requests ##

var User = require('./../model').User;
var utilities = require('../lib/utilities');

function collect(name, userSelectedTime, jid) {

    var rounded_timeslot = utilities.roundTime(userSelectedTime);
    
    User.find({
        where: {
            'jid': jid
        }
    }).on("success", function(usr) {
        if (usr) {
            usr.updateAttributes({
                mention_name: name,
                request_time: userSelectedTime,
                rounded_time: rounded_timeslot
            }).complete(function(err) {
                if (!!err) {
                    console.log('Can not Update Lunch time for User' + name, err);
                } else {
                    console.log('Updating Lunch time for User ' + name + ' to ' + userSelectedTime);
                }
            });
        } else {
            var user = User.build({
                mention_name: name,
                jid: jid,
                request_time: userSelectedTime,
                rounded_time: rounded_timeslot
            });
            user
                .save()
                .complete(function(err) {
                    if (!!err) {
                        console.log('Can not Book Lunch time for User' + name, err);
                    } else {
                        console.log('Creating Lunch time for User ' + name + ' at ' + userSelectedTime);
                    }
                });
        }
    });
}

module.exports.collect = collect;