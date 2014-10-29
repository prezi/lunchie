//Description:
  //Responds to input that isn't a time or cancel

module.exports = function(robot) {
  robot.respond(/(^cancel|Cancel|CANCEL|([0-9]{2})\:([0-9]{2}))/)i, function(msg) {
  var mention_name = msg.message.user.mention_name;

  msg.reply("Hello" + msg.message.user.name + "! This is how Lunchie works.");
  });
}
