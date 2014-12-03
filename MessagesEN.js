/*
 Messages Resource Bundle
 Author : Khaled Sami 
 notes : Contains all the messages that appear to the users
*/
var utilities = require('./lib/utilities');

exports.instructionMsg = 'Hello {0} !\nThis is how to use me!\n\nSign up: Input a preferred lunch time between 12:30 and 14:59 in hh:mm format at least 16 minutes before the actual time.\n\nUpdate: Simply input a new preferred lunch time between 12:30 and 14:59 in hh:mm format\n\nCancel: Send cancel\n\nEnjoy!';
exports.confirmUserSignUpChoice = 'Okay, {0}! I will sign you up for {1}, and notify you of your lunch partners 15 minutes before your lunchtime.';
exports.invalidTimeForLunch = '{0}, your time interval is not correct. Please input a preferred lunch time between {1} and 14:59.';
exports.confirmUserCancelChoice = 'Okay, {0}! I will cancel your lunch request.';
exports.invalidTimeForCancel = 'Hey, {0}! You tried to trick me. Before canceling lunch request try to request it ;) ';
exports.tooLateTimeForLunch = '{0}, Oops it is too late to sign up for this lunch time today, please try another time.';
exports.noMatchesResponse = "Hey, @{0}! Unfortunately, nobody signed up for lunch at {1}. Enjoy your meal!";
exports.wrongCommand = "Sorry I don't know this command. Please type Help to see my commands ;) ";