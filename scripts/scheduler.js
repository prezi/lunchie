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
    // notify_lunch_partners(robot, lunch_time);
    notifyLunchPartners(robot, "13:52");
  }); 
  cronJob.start();
}

function notifyLunchPartners(robot, lunch_time) {
  var groups = retrieveGroups(lunch_time, MAXSIZE);
  
  // robot.messageRoom("12694_1283811@chat.hipchat.com", "Hello");
  // for(var gi in groups) {
  //   console.log('groups[gi]: ' + groups[gi]);
  //   var group = groups[gi];
  //   // console.log('group: ' + group);
  //   // console.log('group[0]: ' + group[0]);
  //   // console.log('mention_name: ' + group[0][0]);
  //   // console.log('jid: ' + group[0][1]);
  //   robot.messageRoom("12694_1283811@chat.hipchat.com", "Hello");
  //   if(group.length == 1) {
  //     var response_text = "Hey " + '@'+group[0][0] + ", unfortunately, nobody signed up for lunch at " + 
  //     lunch_time + ". Enjoy your meal!";
  //     robot.messageRoom(group[0][1], response_text);
  //   } else {
  //     var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n" + 
  //     group[0].map('@'+group[0][1]).join('\n') + "\n";
  //     for(var ui in group) {
  //       var user = group[ui];
  //       robot.messageRoom(group[ui][1], "Hey " + '@'+group[ui][0] + ", "+ response_text.replace('@'+group[ui][0]) + "\n", "");
  //     }
  //   }
  // }
}
