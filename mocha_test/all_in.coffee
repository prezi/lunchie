# Description:
#   lunch roulette for grouping employees
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot 13:00

# # collect.js #
collect = (name, msg, jid) ->
  if /\d{1,2}:\d{1,2}/i.test(msg)
    hours = undefined
    minutes = undefined
    splitted_date = msg.split(":")
    hours = parseInt(splitted_date[0])
    minutes = parseInt(splitted_date[1])
    if hours < 8 or hours > 23 or (hours is 12 and minutes < 00) or minutes < 0 or 59 < minutes
      console.log "datecheck", "date ({0}) does not fit in time interval: 10:00-14:59".format(msg)
    else
      minutes = Math.round((minutes / 15)) * 15
      if (minutes.toString()).length > 1
        time = "{0}:{1}".format(hours.toString(), minutes.toString())
      else
        time = "{0}:{1}".format(hours.toString(), "0" + minutes.toString())
      store[name] = [time]
      jid_store[name] = [jid]
  return

# store[name] = time;
# jid_store[name] = jid;

# # answer.js #
shuffle = (o) ->
  j = undefined
  x = undefined
  i = o.length

  while i
    j = Math.floor(Math.random() * i)
    x = o[--i]
    o[i] = o[j]
    o[j] = x
  o
shuffleTimeArray = (time_array) ->
  for key of time_array
    time_array[key] = shuffle(time_array[key])
    time_array[key] = shuffle(time_array[key])
    time_array[key] = shuffle(time_array[key])
  time_array
dateList = (store) ->
  ret = {}
  for key of store
    timeval = store[key]
    if timeval of ret
      ret[timeval].push key
    else
      ret[timeval] = [key]
  ret
generateGroups = (timeslot, time_array, maxSize) ->
  array = Array::slice.apply(time_array)
  return []  if array.length is 0
  chunkSize = array.length / Math.ceil(array.length / maxSize)
  result = [array.slice(0, chunkSize)].concat(generateGroups(timeslot, array.slice(chunkSize), maxSize))
  result
getLunchPartners = (timeslot) ->
  time_arrays = dateList(store)
  time_arrays = shuffleTimeArray(time_arrays)
  for key of time_arrays
    group = generateGroups(key, time_arrays[key], 4)
    i = 0

    while i < group.length
      j = 0

      while j < group[i].length
        group[i][j] =
          mention_name: group[i][j]
          jid: jid_store[group[i][j]]
        j++
      lunchGroups[key] = group
      i++
  lunchGroups[timeslot]
cancelLunch = (mention_name) ->
  if mention_name of store
    delete store[mention_name]

    delete jid_store[mention_name]
  return
notify_lunch_partners = (robot, lunch_time) ->
  groups = getLunchPartners(lunch_time)
  for gi of groups
    group = groups[gi]
    if group.length is 1
      user = group[0]
      response_text = "Hey " + get_mention_name(group[0]) + ", unfortunately, nobody signed up for lunch at " + lunch_time + ". Enjoy your meal!"
      robot.messageRoom group[0].jid[0], response_text
    else
      response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n" + group.map(get_mention_name).join("\n") + "\n"
      for ui of group
        user = group[ui]
        robot.messageRoom group[ui].jid[0], "Hey " + get_mention_name(group[ui]) + ", " + response_text.replace(get_mention_name(group[ui]) + "\n", "")
  return
get_mention_name = (user) ->
  "@" + user.mention_name
store = {}
jid_store = {}
lunchGroups = {}
timeFormat = /([0-9]{2})\:([0-9]{2})/
module.exports = (robot) ->
  robot.respond /([0-9]{2})\:([0-9]{2})/i, (msg) ->
    mention_name = msg.message.user.mention_name
    time = msg.match[1] + ":" + msg.match[2]
    jid = msg.message.user.jid
    collect mention_name, time, jid
    msg.reply "Okay, " + msg.message.user.name + "! I will sign you up for " + time + "."
    return

  robot.respond /hello|hi|info/i, (msg) ->
    mention_name = msg.message.user.mention_name
    msg.reply "Hi" + " " + msg.message.user.name + "! Welcome to lunch-roulette. I hope you meet some new Prezilians today! Please input a preferred lunch time between 12:30 and 14:59. I will notify you of your random partners 15 minutes prior to lunch! \n You may also cancel or update your request anytime. Enjoy!"
    return

  robot.respond /cancel/i, (msg) ->
    mention_name = msg.message.user.mention_name
    cancelLunch mention_name
    msg.reply "Okay, " + msg.message.user.name + "! I will cancel your lunch request."
    return

  cron = require("cron")
  cronJob = cron.job("0 */1 * * * *", ->
    lunch_date = new Date()
    lunch_date.setMinutes lunch_date.getMinutes() + 15
    if (lunch_date.getMinutes()) < 10
      lunch_time = lunch_date.getHours() + ":0" + lunch_date.getMinutes()
    else
      lunch_time = lunch_date.getHours() + ":" + lunch_date.getMinutes()
    console.log "lunch time is " + lunch_time
    notify_lunch_partners robot, lunch_time
    return
  )
  cronJob.start()
  return

unless String::format
  String::format = ->
    args = arguments
    @replace /{(\d+)}/g, (match, number) ->
      (if typeof args[number] isnt "undefined" then args[number] else match)

module.exports = collect
module.exports = dateList
module.exports = generateGroups
module.exports = getLunchPartners
module.exports = cancelLunch
module.exports = notify_lunch_partners
module.exports.store = store
module.exports.jid_store = jid_store
module.exports.lunchGroups = lunchGroups