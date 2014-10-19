module.exports = (robot) ->
  robot.respond /hello$/i, (msg) ->
    msg.send "hi! :)"
    user =
      id: "1283794"
      jid: "12694_1283794@chat.hipchat.com"
      name: "Alaa Shafaee"
      mention_name: "AlaaShafaee"
    
    robot.send user, "Received a greeting"