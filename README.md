# Lunchie

Lunchie is a a version of GitHub's Campfire bot, [hubot](https://hubot.github.com/). He's pretty cool, so we just changed it a little and deployed it on [Heroku](http://www.heroku.com) so it can connect to [HipChat](https://www.hipchat.com/).

## Setup and Run!

### Setting up Lunchie

We created a `package.json`, so if you `npm install` it, you'll already have:

- [Hubot](https://hubot.github.com/) and the hubot-scripts
- [Hubot-Hipchat](https://github.com/hipchat/hubot-hipchat), for connecting hubot to the HipChat system
- [Mocha](http://visionmedia.github.io/mocha/), for testing (we also have some test-files for you)

installed on your computer.

### Running Lunchie locally

Set deployment_mode variable in the AppConfig file to [deployment_local]

Change the local Database Paramters to match your paramters (dbName , dbUserName , dbPassword)

You can test your hubot locally by typing `% bin/hubot` in your terminal.

However, if you want to run it on HipChat, you will need a HipChat account for that. After creating your account, check your profile settings. At the *XMPP/Jabber info* part you can see the *Jabber ID* which is *JID* now and you'll also need your password for making it work.

To run your Lunchie locally, we need this in the terminal:

    sudo HUBOT_HIPCHAT_JID="jid_for_hipchat" HUBOT_HIPCHAT_PASSWORD="your_password" bin/hubot --adapter hipchat

or you can just make a local.sh file with

    #!/bin/sh

    export HUBOT_HIPCHAT_JID="jid_for_hipchat"
    export HUBOT_HIPCHAT_PASSWORD="your_password"

    exec bin/hubot --adapter hipchat

inside and after making it executable (`chmod +x local.sh`), you can just run it with `./local.sh`.

Check HipChat now. Lunchie should be there :)

## Running the deployed Lunchie

### Deployment on Heroku

    % heroku create --stack cedar
    % git push heroku master
    % heroku ps:scale app=1

Also you need to set deployment_mode variable in the AppConfig file to [deployment_server].

If you run into any problems, checkout Heroku's [docs](https://devcenter.heroku.com/articles/getting-started-with-nodejs-o).

You'll need to edit the `Procfile` to set the name of your hubot.

More detailed documentation can be found on the
[deploying hubot onto Heroku](https://github.com/github/hubot/blob/master/docs/deploying/heroku.md) wiki page.

In Heroku, you have to set the Config Variables: you just need to add the same info you did when you were running it locally:

- HUBOT_HIPCHAT_JID      jid_for_hipchat
- HUBOT_HIPCHAT_PASSWORD your_password

After assigning at least 1 dyno to this task, your Lunchie should be up and running in HipChat, always!

If you want to see the actual records in the database you need to use this [Heroku addon](https://addons.heroku.com/pgbackups).

## Restart the bot

You may want to get comfortable with `heroku logs` and `heroku restart`
if you're having issues.

### Database

For database modules, you can use [Sequelize](http://sequelizejs.com/articles/getting-started).
You will also need to setup [Postgress on your local Machine](https://wiki.postgresql.org/wiki/Detailed_installation_guides).

## In case, you want to improve or change it...

You can add your own scripts to hubot, check out the [Scripting Guide](https://github.com/github/hubot/blob/master/docs/scripting.md) and [hubot-scripts](https://github.com/github/hubot-scripts).
Or use hubot on an other interface, like Campfire or IRC: [Hubot Adapters](https://github.com/github/hubot/blob/master/docs/adapters.md).
