// # collect.js #

// ## Functions to process and collect the incoming messages ##

var jf = require('jsonfile');

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
    var users = {};
    users[name] = [rounded_timeslot, jid];
    if (lunch_groups[rounded_timeslot]) {
        for (user_index in lunch_groups[rounded_timeslot]) {
            if (lunch_groups[rounded_timeslot][user_index][0] == name) {
                lunch_groups[rounded_timeslot][user_index] = [name, jid];                
            } else {
                lunch_groups[rounded_timeslot].push([name, jid]);
            }
        }
    } else {
        lunch_groups[rounded_timeslot] = [[name, jid]];
    }
    // writeToFile(lunch_groups);
    jf.writeFile('../data.json', lunch_groups, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + '../data.json');
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
        minutes = Math.round((minutes/2)) * 2;
            
        if ((minutes.toString()).length > 1 ) {
            var time = '{0}:{1}'.format(hours.toString(), minutes.toString());
        } else {
            var time = '{0}:{1}'.format(hours.toString(), "0"+ minutes.toString());
        }
    }
    return time;
}

// function writeToFile(lunch_groups) {
//     jf.writeFile('../data.json', lunch_groups, function(err) {
    //     if(err) {
    //       console.log(err);
    //     } else {
    //       console.log("JSON saved to " + '../data.json');
    //     }
//     });
// };

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
