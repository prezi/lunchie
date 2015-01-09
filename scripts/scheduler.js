// Author:
//   Alaa Shafaee
//
// Description:
//   A script that runs every 15 minutes and notifies the groups that will have lunch together in
//   the coming 15 minutes.
//
// Dependencies:
//   cron, notify_lunch_partners

retrieveGroups = require('./../lib/answer').retrieveGroups;
var usrMsgs = require('../MessagesEN');

var MAXSIZE = require('../globals').groupMaxSize;

module.exports = function(robot) {

    var cron = require('cron');

    // script runs only on every quarter between 12 pm to 15 pm
    var cronJob = cron.job("0 0,15,30,45 12-15 * * *", function() {

        var lunch_date = new Date();

        lunch_date.setMinutes(lunch_date.getMinutes() + 15);

        if ((lunch_date.getMinutes()) < 10) {
            var lunch_time = lunch_date.getHours() + ":0" + lunch_date.getMinutes();
        } else {
            var lunch_time = lunch_date.getHours() + ":" + lunch_date.getMinutes();
        }

        notifyLunchPartners(robot, lunch_time);

    });

    cronJob.start();
}

function notifyLunchPartners(robot, lunch_time) {

    retrieveGroups(lunch_time, MAXSIZE, function(lunch_groups) {

        /* start notify people here */
        for (var gi in lunch_groups) {
            var group = lunch_groups[gi];
            if (group.length == 1) {
                robot.messageRoom(group[0].jid, usrMsgs.noMatchesResponse.format(group[0].mention_name, lunch_time));

            } 

            else {
                var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partner";
                if (group.length == 2) {
                    response_text += " is:\n";
                }
                else { 
                    response_text ++ "s are:\n");
                }

                response_text += group.map(getMentionName).join('\n') + "\n";

                for (var ui in group) {
                    var user = group[ui];
                    robot.messageRoom(user.jid, "Hey " + getMentionName(user) + ", " + response_text.replace(getMentionName(user) + '\n', ""));
                }
            }
        }
    })
}

function getMentionName(user) {
    return '@' + user.mention_name;
}
