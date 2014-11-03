// Author:
//   Alaa Shafaee
//
// Description:
//   A script that runs every 15 minutes and notifies the groups that will have lunch together in
//   the coming 15 minutes.
//
// Dependencies:
//   cron, notify_lunch_partners

generateGroups = require('./../lib/answer').generateGroups;
var lunch_groups = require('../data.json');
var MAXSIZE = 4;

module.exports = function(robot) {
  var cron = require('cron');
  var cronJob = cron.job("0 */1 * * * *", function() {
  //  var cronJob = cron.job("0 0,15,30,45 * * * *", function() {
    var lunch_date = new Date();
    console.log("date: " + lunch_date);

    lunch_date.setMinutes(lunch_date.getMinutes() + 15);
    if ((lunch_date.getMinutes()) < 10 ) {
      var lunch_time = lunch_date.getHours() + ":0" + lunch_date.getMinutes();
    } else {
      var lunch_time = lunch_date.getHours() + ":" + lunch_date.getMinutes();
    }

    console.log("lunch time is " + lunch_time);
    notify_lunch_partners(robot, lunch_time);
  }); 
  cronJob.start();
}
function notify_lunch_partners(robot, lunch_time) {
  // var groups = getLunchPartners(lunch_time);
  var groups = generateGroups(lunch_time, lunch_groups, MAXSIZE);
  for(var gi in groups) {
    var group = groups[gi];
    if(group.length == 1) {
      var response_text = "Hey " + get_mention_name(group[0]) + ", unfortunately, nobody signed up for lunch at " + 
      lunch_time + ". Enjoy your meal!";
      robot.messageRoom(group[1], response_text);      
    } else {
      var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n" + 
      group.map('@'+group[0]).join('\n') + "\n";
      for(var ui in group) {
        var user = group[ui];
        robot.messageRoom(group[ui].jid[0], "Hey " + '@'+group[ui] + ", "+ response_text.replace('@'+group[ui]) + "\n", "");
      }
    }
  }
}
