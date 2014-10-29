//Description:
  //Cancels lunch requests

module.exports = function(robot) {
  robot.respond(/cancel|Cancel|CANCEL/i, function(msg) {
  var mention_name = msg.message.user.mention_name;

  cancelLunch(mention_name);

  msg.reply("Okay, " + msg.message.user.name + "! I will cancel your lunch request for" + time + ".");
  };
}