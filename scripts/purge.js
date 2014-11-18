var sequelize = require('./../model').sequelize

module.exports = function(robot) {
 
  var cron = require('cron');
  var cronJob = cron.job("00 00 * * *", function() {
    
  sequelize
    .query("TRUNCATE table users;").success(function(myTableRows) {
    console.log(myTableRows)
})

  });

  cronJob.start();
}

