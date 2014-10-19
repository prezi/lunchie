module.exports = (robot) ->
  robot.respond /hi$/i, (msg) ->
    msg.send "hi! :)"