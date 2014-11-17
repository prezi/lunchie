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

var MAXSIZE = 4;

module.exports = function(robot) {
 
  var cron = require('cron');
 
  // script runs only on every quarter between 12 pm to 15 pm
  var cronJob = cron.job("0 0,15,30,45 12-15 * * *", function() {
    
    var lunch_date = new Date();
    
    console.log("date: " + lunch_date);

    lunch_date.setMinutes(lunch_date.getMinutes() + 15);

    if ((lunch_date.getMinutes()) < 10 ) {
      var lunch_time = lunch_date.getHours() + ":0" + lunch_date.getMinutes();
    } else {
      var lunch_time = lunch_date.getHours() + ":" + lunch_date.getMinutes();
    }

    console.log("lunch time is " + lunch_time);

    notifyLunchPartners(robot, lunch_time);

  });

  cronJob.start();
}

function notifyLunchPartners(robot, lunch_time) {

  retrieveGroups(lunch_time, MAXSIZE , function(lunch_groups){

    // just for test 
     console.log(lunch_groups);
     for(var gi in lunch_groups){
       console.log(" Group Number " +  gi   + " size = " +  lunch_groups[gi].length);
     }

    /* start notify people here */
    for (var gi in lunch_groups) {
      var group = lunch_groups[gi];
      if (group.length == 1) {
        // var response_text = "Hey " + '@'+group[0].mention_name + ", unfortunately, nobody signed up for lunch at " + 
        // lunch_time + ". Enjoy your meal!";
        robot.messageRoom(group[0].jid, usrMsgs.noMatchesResponse.format(group[0].mention_name, lunch_time));

      } else {
        var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n" + 
        group.map(getMentionName).join('\n') + "\n";

        for(var ui in group) {
          var user = group[ui];
          robot.messageRoom(user.jid, "Hey " + getMentionName(user) + ", "+ response_text.replace(getMentionName(user)) + '\n', "");
        }
      }
    }
  }
)}

function getMentionName(user) {
  return '@' + user.mention_name;
}
