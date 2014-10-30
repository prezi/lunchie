//Description:
  //Responds to input that isn't a time or cancel

module.exports = function(robot) {
  robot.respond(/hello|hi|info/i, function(msg) {
  var mention_name = msg.message.user.mention_name;
  msg.reply("Hello" + " "+ msg.message.user.name + "! Welcome to lunch-roulette. I hope you meet some new Prezilians today! Please input a preferred lunch time between 12:30 and 14:59. I will notify you of your random partners 15 minutes prior to lunch! \n You may also cancel or update your request anytime. Enjoy!");

  });
}
