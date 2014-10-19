module.exports = (robot) ->
  robot.respond /hello$/i, (msg) ->
    msg.send "hi! :)"
    console.log msg.message.user
    robot.send "@AlaaShafaee", "Received a greeting"
    robot.send "AlaaShafaee", "Received a greeting!"