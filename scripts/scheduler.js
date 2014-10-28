// Author:
//   Alaa Shafaee
//
// Description:
//   A script that runs every 15 minutes and notifies the groups that will have lunch together in
//   the coming 15 minutes.
//
// Dependencies:
//   cron, notify_lunch_partners

getLunchPartners = require('./../lib/answer').getLunchPartners;

module.exports = function(robot) {
  /*
   * Cron Jobs are used for scheduling tasks.
   * You can read more about cron jobs here: 
   * http://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800
   * http://www.thegeekstuff.com/2009/06/15-practical-crontab-examples/
   * http://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800
   */
  var cron = require('cron');
  //Cron job that fires at the first, 15th, 30th and 45th minute of every hour.
  var cronJob = cron.job("0 */1 * * * *", function() {
    console.log("cron job that fires every hour at x:00, x:15, x:30 and x:45");
    //Gets the current time.
    var lunch_date = new Date();
    //Sets lunch_date to be 15 minutes from now.
    lunch_date.setMinutes(lunch_date.getMinutes() + 1);
    var lunch_time = lunch_date.getHours() + ":" + lunch_date.getMinutes();
    console.log("lunch time is " + lunch_time);
    //Informs users about their lunchmates 15 minutes before lunch.
    notify_lunch_partners(robot, lunch_time);
  }); 
  cronJob.start();
}

//Notifies users about their lunchmates 
function notify_lunch_partners(robot, lunch_time) {
  //'groups' is a 2-dimensional array where each array represents a group that will have lunch together
  //at 'lunch_time'.
  var groups = getLunchPartners(lunch_time);
  //gi is the group index, not the group.
  for(var gi in groups) {
    var group = groups[gi];
    //Notifies users that were not assigned lunchmates.
    if(group.length == 1) {
      //'user' should also have a jid.
      //'mention_name' is the mention_name of HipChat.
      var user = {mention_name: group[0]};
      var response_text = "Hey " + get_mention_name(group[0]) + ", unfortunately, nobody signed up for lunch at " + 
        lunch_time + ". Enjoy your meal!";
      robot.send(user, response_text);
      console.log(response_text);
    } else {
      var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n" + 
      group.map(get_mention_name).join('\n') + "\n";
      //'ui' contains the user index in the array of users, not the user object.
      for(var ui in group) {
        //'user' should also have a jid.
        var user = group[ui];
        //Removes the user name from the list of lunchmates and notifies the user.
        robot.send(user, "Hey " + get_mention_name(user) + ", "+ response_text.replace(get_mention_name(user) 
            + "\n", ""));
      }
    }
  }
}

function get_mention_name(user) {
  return '@' + user.mention_name;
}