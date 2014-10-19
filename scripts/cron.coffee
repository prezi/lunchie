#testing cron jobs and sending messages to rooms and users
module.exports = (robot) ->
  cronJob = require('cron').CronJob
  tz = 'America/Los_Angeles'
  new cronJob('0 */2 * * * *', everyTwoMinutes, null, true, tz)
  new cronJob('0 */1 * * * *', sendMessageToUser, null, true, tz)

  room = "lunchtest"
  everyTwoMinutes = ->
    robot.messageRoom room, 'Sorry, I will nag you every 2 minutes.'
  user =
      id: "1283794"
      jid: "12694_1283794@chat.hipchat.com"
      name: "Alaa Shafaee"
      mention_name: "AlaaShafaee"

  sendMessageToUser = ->
  	robot.send user, "hello"