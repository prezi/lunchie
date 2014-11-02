// Description:
//   lunch roulette for grouping employees
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot 13:00


var store = {};
var jid_store = {};
var lunchGroups = {};

var timeFormat = /([0-9]{2})\:([0-9]{2})/;

module.exports = function(robot) {
    robot.respond(/([0-9]{2})\:([0-9]{2})/i, function(msg) {
        var mention_name = msg.message.user.mention_name;
        var time = msg.match[1] + ":" + msg.match[2];
        var jid = msg.message.user.jid;
        collect(mention_name, time, jid);
        msg.reply("Okay, " + msg.message.user.name + "! I will sign you up for " + time + ".");
    });
    
    robot.respond(/hello|hi|info/i, function(msg) {
        var mention_name = msg.message.user.mention_name;
        msg.reply("Hi" + " "+ msg.message.user.name + "! Welcome to lunch-roulette. I hope you meet some new Prezilians today! Please input a preferred lunch time between 12:30 and 14:59. I will notify you of your random partners 15 minutes prior to lunch! \n You may also cancel or update your request anytime. Enjoy!");
    });

    robot.respond(/cancel/i, function(msg) {
        var mention_name = msg.message.user.mention_name;
        cancelLunch(mention_name);
        msg.reply("Okay, " + msg.message.user.name + "! I will cancel your lunch request.");
    });
    
    var cron = require('cron');
    var cronJob = cron.job("0 */1 * * * *", function() {
        var lunch_date = new Date();
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

// # collect.js #

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
    if(/\d{1,2}:\d{1,2}/i.test(msg)) {
        var hours, minutes;
        var splitted_date = msg.split(':');
        hours = parseInt(splitted_date[0]);
        minutes = parseInt(splitted_date[1]);
        if (hours < 8 || hours > 23 || (hours === 12 && minutes< 00) || minutes < 0 || 59 < minutes) {
            console.log('datecheck','date ({0}) does not fit in time interval: 10:00-14:59'.format(msg));
        } else {
            minutes = Math.round((minutes/15)) * 15;
            if ((minutes.toString()).length > 1 ) {
                var time = '{0}:{1}'.format(hours.toString(), minutes.toString());
            } else {
                var time = '{0}:{1}'.format(hours.toString(), "0"+ minutes.toString());
            }
            // store[name] = [time];
            // jid_store[name] = [jid];

            store[name] = time;
            jid_store[name] = jid;
        }
    }
}

// # answer.js #

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
function shuffleTimeArray(time_array)
{
    for (var key in time_array)
    {
        time_array[key]=shuffle(time_array[key]);
        time_array[key]=shuffle(time_array[key]);
        time_array[key]=shuffle(time_array[key]);
    }
    return time_array;
}

function dateList(store){
    var ret={}; 
    for (var key in store){
        var timeval=store[key];
        if (timeval in ret) {
            ret[timeval].push(key);
        } else {
            ret[timeval]=[key];
        }
    }
    return ret;
}

function generateGroups(timeslot, time_array, maxSize) {
    // var array = Array.prototype.slice.apply(time_array);
    var array = time_array;
    if (array.length == 0) return [];
    var chunkSize = array.length / Math.ceil(array.length / maxSize);
    var result0 = array.slice(0,chunkSize);
    var result = result0.concat(generateGroups(timeslot, array.slice(chunkSize), maxSize));
    return result;
}

function getLunchPartners(timeslot){
    var time_arrays = dateList(store);
    time_arrays = shuffleTimeArray(time_arrays);

    for (key in time_arrays) {
        group = generateGroups(key, time_arrays[key] , 4);
        for (var i=0; i<group.length; i++) {
            for (var j=0; j<group[i].length; j++){
                group[i][j] = {mention_name:group[i][j], jid: jid_store[group[i][j]]};
            }
            lunchGroups[key] = group;
        }
    }
    return lunchGroups[timeslot];
}

function cancelLunch(mention_name) {
  if (mention_name in store) {
    delete store[mention_name];
    delete jid_store[mention_name];
  }
}

function notify_lunch_partners(robot, lunch_time) {
  var groups = getLunchPartners(lunch_time);
  for(var gi in groups) {
    var group = groups[gi];
    if(group.length == 1) {
      var user = group[0];
      var response_text = "Hey " + get_mention_name(group[0]) + ", unfortunately, nobody signed up for lunch at " + 
      lunch_time + ". Enjoy your meal!";
      robot.messageRoom(group[0].jid[0], response_text);
    } else {
      var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n" + 
      group.map(get_mention_name).join('\n') + "\n";
      for(var ui in group) {
        var user = group[ui];
        robot.messageRoom(group[ui].jid[0], "Hey " + get_mention_name(group[ui]) + ", "+ response_text.replace(get_mention_name(group[ui]) + "\n", ""));
      }
    }
  }
}

function get_mention_name(user) {
  return '@' + user.mention_name;
}

module.exports.collect = collect;
module.exports.dateList = dateList;
module.exports.generateGroups = generateGroups;
module.exports.getLunchPartners = getLunchPartners;
module.exports.cancelLunch = cancelLunch;
module.exports.notify_lunch_partners = notify_lunch_partners;

module.exports.store = store;
module.exports.jid_store = jid_store;
module.exports.lunchGroups = lunchGroups;