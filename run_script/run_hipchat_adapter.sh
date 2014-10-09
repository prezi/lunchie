#!/bin/bash -ex
# set default values for env vars
BOT_NAME=LunchRoulette

HUBOT_HIPCHAT_JID=
HUBOT_HIPCHAT_PASSWORD=
HUBOT_HIPCHAT_ROOMS=

HIPCHAT_API_TOKEN=
HIPCHAT_RELAY_ROOMS=

REDIS_ADDRESS=localhost
REDIS_PORT=6379

SCRIBE_SERVER_ADDRESS=$(/sbin/ip route | awk '/default/ { print $3 }')
SCRIBE_SERVER_PORT=1463

HTTP_BASIC_AUTH_USER=
HTTP_BASIC_AUTH_PASSWORD=

LunchRoulette_EMAIL_ADDRESS=
OUTAGE_EMAIL_ADDRESS=

PAGERDUTY_SERVICE_KEYS=

# load env vars from the config file
if [ -f /etc/prezi/LunchRoulette/LunchRoulette.cfg ]
then
    . /etc/prezi/LunchRoulette/LunchRoulette.cfg
fi

# export env vars
export BOT_NAME

export HUBOT_HIPCHAT_JID
export HUBOT_HIPCHAT_PASSWORD
export HUBOT_HIPCHAT_ROOMS

export HIPCHAT_API_TOKEN
export HIPCHAT_RELAY_ROOMS

export REDIS_URL=redis://$REDIS_ADDRESS:$REDIS_PORT

export SCRIBE_SERVER_ADDRESS
export SCRIBE_SERVER_PORT

export HTTP_BASIC_AUTH_USER
export HTTP_BASIC_AUTH_PASSWORD

export LunchRoulette_EMAIL_ADDRESS
export OUTAGE_EMAIL_ADDRESS

export PAGERDUTY_SERVICE_KEYS

# start hubot
$(dirname $0)/../bin/hubot --adapter hipchat
