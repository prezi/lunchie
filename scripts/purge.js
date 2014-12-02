var sequelize = require('./../model').sequelize
var User = require('./../model').User;
var Statistics = require('./../model').Statistics;

module.exports = function(robot) {
 
  var cron = require('cron');
  var cronJob = cron.job("00 00 * * *", function() {
  var data = '';
  
  User
    .findAndCountAll({where : {request_time : {ne: null} }})
    .success(function(users){
      if (users.count > 0) {
    	users.rows.forEach(function(item){
		  data += item.mention_name + '-' + item.request_time + ',';
		  item.request_time = null;
		  item.rounded_time = null;
		  item.save().success(function(err) {
		    console.log('Successfully got data from user: ' + item.mention_name);
		  });
    	});
    	var date = new Date();
    	date.setDate(date.getDate() - 1); //-1 day because script start working at 00:00, so we need to gather statistics for a day that already passed
    	Statistics
    	  .build({
    	    date: date,
    	    data: data,
    	    number_of_users: users.count
    	  })
    	  .save()
    	  .success(function(){
            console.log('Successfully added statistics for date ' + date);
    	  })
    	  .failure(function(err){
    	  	console.log('Can not add statistics for date: ' + date, err);
    	  });
      }
    }) 

   });

  cronJob.start();
}
