var assert = require("chai").assert;
var path   = require("path");

var User = require('../model').User;
var Robot       = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

describe("Lunchie", function() {
    var robot;
    var user;
    var adapter;

    beforeEach(function(done) {
        // create new robot, without http, using the mock adapter
        robot = new Robot(null, "mock-adapter", false, "Lunchie");

        robot.adapter.on("connected", function() {
            // only load scripts we absolutely need, like auth.coffee
            //process.env.HUBOT_AUTH_ADMIN = "1";
            // robot.loadFile(
            //     path.resolve(
            //         path.join("./src/")
            //     ),
            //     "help.coffee"
            // );

            // load the module under test and configure it for the
            // robot.  This is in place of external-scripts
            require("../scripts/hello.js")(robot);
            require("../scripts/main.js")(robot);
            require("../scripts/scheduler.js")(robot);

            // create a user
            user = robot.brain.userForId("1", {
                name: "mocha",
                mention_name: "mocha_user",
                jid: "12694_1283811@chat.hipchat.com",
                room: "#lunchietest"
            });

            adapter = robot.adapter;

            done();
        });

        robot.run();
    });

    afterEach(function() {
        robot.shutdown();
    });

    it("responds when greeted", function(done) {
        adapter.on("reply", function(envelope, strings) {
            assert.match(strings[0], (/Welcome to lunch-roulette. I hope you meet some new Prezilians today! Please input a preferred lunch time between 12:30 and 14:59. I will notify you of your random partners 15 minutes prior to lunch! \n You may also cancel or update your request anytime. Enjoy!/));
            done();
        });

        adapter.receive(new TextMessage(user, "@lunchie hello"));
    });

    it("adds user to database on normal input", function(done) {
        // here's where the magic happens!
        adapter.on("reply", function(envelope, strings) {
            User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
                assert.isNotNull(usr, "Adding user to db was not successfull");        
                done();
            });
        });

        adapter.receive(new TextMessage(user, "@lunchie 12:49"));

    });

    it.skip("rounds time correctly", function(done) {
        // here's where the magic happens!
        adapter.on("reply", function(envelope, strings) {
            User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
                assert.equal(usr.rounded_time,'12:30', "Nope, it doesn't round time correctly");        
                done();
            });
        });

        adapter.receive(new TextMessage(user, "@lunchie 12:39"));

    });

    it("knows that time interval should be between 12:30 and 14:59", function(done) {
        var mocha_user;
        var numOfCases = 3;
        var curCase = 0;
        User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
            if(usr) mocha_user = usr;        
        });
        adapter.on("reply", function(envelope, strings) {
            ++curCase;
            User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
                assert.deepEqual(mocha_user, usr);
            });
            assert.match(strings[0], (/, Your time interval is not correct. Please input a preferred lunch time between 12:30 and 14:59./));
            if (curCase == numOfCases) done();
        });

        adapter.receive(new TextMessage(user, "@lunchie 15:59"));
        adapter.receive(new TextMessage(user, "@lunchie 12:29"));
        adapter.receive(new TextMessage(user, "@lunchie 13:60"));

    });

});