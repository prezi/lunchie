// # collect.js #

// ## Functions to process and collect the incoming messages ##

var User = require('./../model').User;


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

function collect(name, userSelectedTime, jid) {
  var rounded_timeslot = roundTime(userSelectedTime);
  User.find({where: {'jid': jid}}).on("success", function(usr){
    if (usr) {
      usr.updateAttributes({
        mention_name: name,
        request_time: userSelectedTime,
        rounded_time: rounded_timeslot
      }).complete(function(err) {
          if (!!err) {
            console.log('Can not Update Lunch time for User' + name , err);
          } else {
            console.log('Updating Lunch time for User ' + name + ' to ' + userSelectedTime );
          }
      });
    } else {
      var user = User.build({
            mention_name: name,
            jid: jid,
            request_time: userSelectedTime,
            rounded_time: rounded_timeslot
          });
      user
        .save()
        .complete(function(err) {
         if (!!err) {
            console.log('Can not Book Lunch time for User' + name , err);
          } else {
            console.log('Creating Lunch time for User ' + name + ' at ' + userSelectedTime );
          }
        });
    }
  });
   
 }

function roundTime(requestedTime) {
     
  var splitted_date = requestedTime.split(':');

  var hours = parseInt(splitted_date[0]);

  var minutes = parseInt(splitted_date[1]);
    
  var minutesMod15 = minutes % 15;
    
  minutes = (minutesMod15 < 8) ? minutes - (minutesMod15) : minutes + (15 - minutesMod15);

  if (minutes == 60) {
    hours++;
    minutes = 0;
  }

  if ((minutes.toString()).length < 2 ) {
      minutes = '0' + minutes;
  }

  var roundedTime = '{0}:{1}'.format(hours.toString(), minutes.toString());
  
  return roundedTime;
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
