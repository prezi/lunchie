// # collect.js #

// ## Functions to process and collect the incoming messages ##

var User = require('./../model').User;
// var User = models.User;


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match;
    });
  };
}

function collect(name, msg, jid) {
    var rounded_timeslot = roundTime(msg);

  //   User
  // .create({
  //   mention_name: name,
  //   jid: jid,
  //   time_request: msg,
  //   rounded_time: rounded_timeslot,
    
  // })
  // .complete(function(err, user) {
  //   if (!!err) {
  //     console.log('The instance has not been saved:', err)
  //   } else {
  //     console.log('We have a persisted instance now')
  //   }
  // })
var user = User.build({
    mention_name: name,
    jid: jid,
    time_request: msg,
    rounded_time: rounded_timeslot,
})
 
user
  .save()
  .complete(function(err) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
    }
  })

 }

function roundTime(msg) {
    if(/\d{1,2}:\d{1,2}/i.test(msg)) {
        var hours, minutes;
        var splitted_date = msg.split(':');
        hours = parseInt(splitted_date[0]);
        minutes = parseInt(splitted_date[1]);
        
        // minutes = Math.round((minutes/15)) * 15;
        minutes = Math.round((minutes/2)) * 2;
            
        if ((minutes.toString()).length > 1 ) {
            var time = '{0}:{1}'.format(hours.toString(), minutes.toString());
        } else {
            var time = '{0}:{1}'.format(hours.toString(), "0"+ minutes.toString());
        }
    }
    return time;
}

module.exports.collect = collect;
