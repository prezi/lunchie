module.exports = (robot) ->
  robot.respond /hello$/i, (msg) ->
    msg.send "hey! :)"
    cronJob = require('cron').CronJob
    tz = 'America/Los_Angeles'; 
    new cronJob('* * * * * *', writeToConsole, null, true, tz)
    writeToConsole = ->
      console.log "You will see this every second"

    user =
      id: "1283794"
      jid: "12694_1283794@chat.hipchat.com"
      #name: "Alaa Shafaee"
      mention_name: "AlaaShafaee"
    
    robot.send user, "Received a greeting from " + msg.message.user.name

    user =
      id: "1283794"
      #name: "Alaa Shafaee"
      mention_name: "AlaaShafaee"

    robot.send user, "Received 2" + msg.message.user.name

     user =
      id: "1283794"
      mention_name: "AlaaShafaee"

    robot.send user, "Received 3" + msg.message.user.name

     user =
      mention_name: "AlaaShafaee"

    robot.send user, "Received 4" + msg.message.user.name