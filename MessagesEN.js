/*
 Messages Resource Bundle
 Author : Khaled Sami 
 notes : Contains all the messages that appear to the users
*/
var utilities = require('./lib/utilities');

var welcomeMsg = 'Hi {0}! Welcome to lunch-roulette. I hope you meet some new Prezilians today! Please input a preferred lunch time between 12:30 and 14:59. I will notify you of your random partners 15 minutes prior to lunch! \n You may also cancel or update your request anytime. Enjoy!';
var confirmUserSignUpChoice = 'Okay, {0}! I will sign you up for {1}.';
var invalidTimeForLunch = '{0}, your time interval is not correct. Please input a preferred lunch time between {1} and 14:59.';
var tooLateTimeForLunch = '{0}, oops it is too late to sign up for this lunch time today, please try another time.';
var confirmUserCancelChoice = 'Okay, {0}! I will cancel your lunch request.';
var invalidTimeForCancel = 'Hey, {0}! You tried to trick me. Before canceling lunch request try to request it ;) ';
var noMatchesResponse = "Hey, @{0}! Unfortunately, nobody signed up for lunch at {1}. Enjoy your meal!";

exports.welcomeMsg = welcomeMsg;
exports.confirmUserSignUpChoice = confirmUserSignUpChoice;
exports.invalidTimeForLunch = invalidTimeForLunch;
exports.confirmUserCancelChoice = confirmUserCancelChoice;
exports.invalidTimeForCancel = invalidTimeForCancel;
exports.tooLateTimeForLunch = tooLateTimeForLunch;
exports.noMatchesResponse = noMatchesResponse;
