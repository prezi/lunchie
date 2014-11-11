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
  User.find({where: {'jid': jid}}).on("success", function(usr){
    if (usr) {
      usr.updateAttributes({
        mention_name: name,
        request_time: msg,
        rounded_time: rounded_timeslot
      }).complete(function(err) {
          if (!!err) {
            console.log('The instance has not been saved:', err);
          } else {
            console.log('We have a persisted instance now');
          }
      });
    } else {
      var user = User.build({
            mention_name: name,
            jid: jid,
            request_time: msg,
            rounded_time: rounded_timeslot
          });
      user
        .save()
        .complete(function(err) {
          if (!!err) {
            console.log('The instance has not been saved:', err);
          } else {
            console.log('We have a persisted instance now');
          }
        });
    }
  });
   
 }

function roundTime(msg) {
    if(/\d{1,2}:\d{1,2}/i.test(msg)) {
        var hours, minutes;
        var splitted_date = msg.split(':');
        hours = parseInt(splitted_date[0]);
        minutes = parseInt(splitted_date[1]);
        
        // minutes = Math.round((minutes/15)) * 15;
        //minutes = Math.round((minutes/2)) * 2;
        var minutesMod15 = minutes % 15;
        minutes = (minutesMod15 < 8) ? minutes - (minutesMod15) : minutes + (15 - minutesMod15);
        if (minutes == 60) {
          hours++;
          minutes = 0;
        }

        if ((minutes.toString()).length > 1 ) {
            var time = '{0}:{1}'.format(hours.toString(), minutes.toString());
        } else {
            var time = '{0}:{1}'.format(hours.toString(), "0"+ minutes.toString());
        }
    }
    return time;
}

// collect('Zoe', '13:00', '12694_1283811@chat.hipchat.com');
// collect('Kieu', '14:00', '12694_1283812@chat.hipchat.com');
// collect('Alaa', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa0', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa1', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa3', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa4', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa5', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa6', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa7', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa8', '13:00', '12694_1283813@chat.hipchat.com');
// collect('Alaa9', '13:00', '12694_1283813@chat.hipchat.com');

module.exports.collect = collect;
