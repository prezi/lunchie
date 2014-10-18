# Author:
#   Alaa Shafaee
#
# Description:
#   Allows Hubot to recognize a request to randomly match lunch partners.
#
# Commands:
#   hubot [lunch time] - Requests up to four random lunch partners at the specified lunch time.
# 
# Examples:
#   hubot 12:00
#   hubot 1:30
#   hubot 02:15

module.exports = (robot) ->
  robot.respond /(?:\d|[01]\d|2[0-3]):[0-5]\d$/i, (msg) ->
    msg.send "Hi! You will be notified about your random lunch partners 5 minutes before lunch. Bon Appétit! :)"