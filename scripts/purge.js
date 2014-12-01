var sequelize = require('./../model').sequelize

module.exports = function(robot) {
 
  var cron = require('cron');
  var cronJob = cron.job("00 00 * * *", function() {
    
  sequelize
    .query("UPDATE users SET request_time=NULL, rounded_time=NULL WHERE request_time IS NOT NULL OR rounded_time IS NOT NULL;").success(function(myTableRows) {
    	console.log("Removing .. Now users have no scheduled lunch time");
	})
  });

  cronJob.start();
}
