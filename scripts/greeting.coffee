module.exports = (robot) ->
  robot.respond /hi$/i, (msg) ->
    msg.send "hi! :)"
    robot.send "@AlaaShafaee", "Received a greeting"
    robot.send "AlaaShafaee", "Received a greeting!"