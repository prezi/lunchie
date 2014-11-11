/*
 Messages Resource Bunddle
 Author : Khaled Sami 
 notes : Contains all the messages that appear to the users
*/

var welcomeMsg = 'Hi {0} ! Welcome to lunch-roulette. I hope you meet some new Prezilians today! Please input a preferred lunch time between 12:30 and 14:59. I will notify you of your random partners 15 minutes prior to lunch! \n You may also cancel or update your request anytime. Enjoy!';
var confirmUserSignUpChoice = 'Okay, {0} ! I will sign you up for {1}.';
var invalidTimeForLunch = '{0}, Your time interval is not correct. Please input a preferred lunch time between 12:30 and 14:59.';
var confirmUserCancelChoice = 'Okay, {0} ! I will cancel your lunch request.';
var invalidTimeForCancel = 'Hey, {0} ! You tried to trick me. Before canceling lunch request try to request it ;) ';



exports.welcomeMsg = welcomeMsg;
exports.confirmUserSignUpChoice = confirmUserSignUpChoice;
exports.invalidTimeForLunch = invalidTimeForLunch;
exports.confirmUserCancelChoice = confirmUserCancelChoice;
exports.invalidTimeForCancel = invalidTimeForCancel;

