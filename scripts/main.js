var collect = require('./../lib/collect').collect;
var utilities = require('./../lib/utilities');
var User = require('../model').User;
var usrMsgs = require('../MessagesEN');
var globals = require('../globals');

module.exports = function(robot) {
    robot.respond(/(.*)/i, function(msg) {
        var inputCommand = msg.match[1];
        if (matchCommand(msg, inputCommand) === 0) {
            msg.reply(usrMsgs.invalidTimeForCancel.format(msg.message.user.name));
            msg.reply(usrMsgs.wrongCommand);
        }
    });
};


function matchCommand(msg, inputCommand) {
    inputCommand = inputCommand.trim();
    if (inputCommand.split(/\s+/).length > 1){
        return 0;
    }
    if ((inputCommand.match(globals.helloRegex) !== null) || (inputCommand.match(globals.helpRegex) !== null)) {
        showInstructionMessage(msg);
    } else if (inputCommand.match(globals.cancelRegex) !== null) {
        cancel(msg);
    } else if (inputCommand.match(globals.timeRegex) !== null) {
        lunchRequest(inputCommand, msg);
    } else if (inputCommand.match(globals.thanksRegex) !== null) {
        showThanksMessage(inputCommand, msg);
    } else if (inputCommand.match(globals.rulesRegex) !== null) {
        // replying with the rules
    } else {
        return 0;
    }
    return 1;
}


function showInstructionMessage(msg) {
    msg.reply(usrMsgs.instructionMsg.format(msg.message.user.name));
}

function cancel(msg) {
    var _jid = msg.message.user.jid;
    User.find({
        where: {
            jid: _jid
        }
    }).success(function(usr) {
        if (usr && usr.rounded_time != null && usr.request_time != null) {
            usr.updateAttributes({request_time: null, rounded_time: null}).success(function() {
                console.log("User canceled lunch successfully!");
            })
            msg.reply(usrMsgs.confirmUserCancelChoice.format(msg.message.user.name));
        } else {
            msg.reply(usrMsgs.invalidTimeForCancel.format(msg.message.user.name));
        }
    });
}

function lunchRequest(inputCommand, msg) {
    var hours = inputCommand.split(':')[0];
    var minutes = inputCommand.split(':')[1];
    var checkCorrectTimeForLunch = utilities.checkLunchTime(hours + ":" + minutes);
    if (checkCorrectTimeForLunch === 1) {
        var mention_name = msg.message.user.mention_name;
        var time = hours + ":" + minutes;
        var jid = msg.message.user.jid;
        collect(mention_name, time, jid);
        msg.reply(usrMsgs.confirmUserSignUpChoice.format(msg.message.user.name, time));
    } else if (checkCorrectTimeForLunch === 0) {
        msg.reply(usrMsgs.tooLateTimeForLunch.format(msg.message.user.name));
    } else {
        msg.reply(usrMsgs.invalidTimeForLunch.format(msg.message.user.name, checkCorrectTimeForLunch));
    }
}
function showThanksMessage(msg) {
    msg.reply(usrMsgs.thanksMsg.format(msg.message.user.name));
}
