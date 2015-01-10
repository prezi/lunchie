var assert = require("chai").assert;
var path   = require("path");
var expect = require("chai").expect;

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

    // it("adds user to database on normal input", function(done) {
    //     adapter.on("reply", function(envelope, strings) {
    //         setTimeout(function(){
    //             User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //                 assert.isNotNull(usr, "Adding user to db was not successfull");
    //                 done();
    //             });
    //         }, 2000);
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie 14:49"));
    //
    // });
    //
    //  //Timeout is specified because we need some time before data in database will be updated.
    // it("rounds time", function(done) {
    //     adapter.on("reply", function(envelope, strings) {
    //         setTimeout(function(){
    //             User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //             console.log(usr);
    //             assert.equal(usr.rounded_time,'15:00', "Nope, it doesn't round time correctly");
    //             done();
    //         })}, 1000);
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie 14:55"));
    //
    // });
    //
    // it("knows that time interval should be between 12:30(or current time if it is bigger) and 14:59", function(done) {
    //     var mocha_user;
    //     var numOfCases = 3;
    //     var curCase = 0;
    //     User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //         if(usr) mocha_user = usr;
    //     });
    //     adapter.on("reply", function(envelope, strings) {
    //         setTimeout(function(){
    //             ++curCase;
    //             User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //                 assert.deepEqual(mocha_user, usr);
    //             });
    //             assert.match(strings[0], ("mocha, your time interval is not correct. Please input a preferred lunch time between 12:30 and 14:59."));
    //             if (curCase == numOfCases) done();
    //         }, 2000);
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie 15:59"));
    //     adapter.receive(new TextMessage(user, "@lunchie 12:29"));
    //     adapter.receive(new TextMessage(user, "@lunchie 13:60"));
    //
    // });
    //
    // //Timeouts are specified because we need some time before data in database will be updated.
    // it("handles multiple messages from the same user", function(done) {
    //     var numOfCases = 4;
    //     var curCase = 0;
    //     this.timeout(10000);
    //     adapter.on("reply", function(envelope, strings) {
    //         if (++curCase == numOfCases)
    //             setTimeout(function(){User.find({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //                 assert.equal(usr.request_time,'13:35', "Nope, it doesn't handle multiple messages correctly");
    //                 done();
    //             })}, 1000);
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie 12:39"));
    //     adapter.receive(new TextMessage(user, "@lunchie 14:39"));
    //     adapter.receive(new TextMessage(user, "@lunchie 12:35"));
    //     setTimeout(function(){adapter.receive(new TextMessage(user, "@lunchie 13:35"))}, 1000);
    //     //timeout is guaranty that this message will be processed last by db
    // });
    //
    // //Timeouts are specified because we need some time before data in database will be updated.
    // it("handles same multiple messages from the same user and not doubling user in database", function(done) {
    //     var numOfCases = 4;
    //     var curCase = 0;
    //     adapter.on("reply", function(envelope, strings) {
    //         if (++curCase == numOfCases)
    //             setTimeout(function(){User.findAndCountAll({ where: { mention_name : "mocha_user"} }).success(function(result) {
    //                 assert.equal(result.count, 1, "Nope, It doubles user info in database");
    //                 done();
    //             })}, 1000);
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie 12:35"));
    //     adapter.receive(new TextMessage(user, "@lunchie 12:35"));
    //     adapter.receive(new TextMessage(user, "@lunchie 12:35"));
    //     adapter.receive(new TextMessage(user, "@lunchie 12:35"));
    //
    // });
    //
    // it("canceles previous time", function(done) {
    //     adapter.on("reply", function(envelope, strings) {
    //         User.findAndCountAll({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //             assert.isUndefined(usr.request_time);
    //             assert.isUndefined(usr.rounded_time);
    //             assert.match(strings[0], (/I will cancel your lunch request./));
    //             setTimeout(done, 1000);
    //         });
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie cancel"));
    //
    // });
    //
    // it("cancel a time that was not entered before", function(done) {
    //     adapter.on("reply", function(envelope, strings) {
    //         User.findAndCountAll({ where: { mention_name : "mocha_user"} }).success(function(usr) {
    //             assert.match(strings[0], (/You tried to trick me. Before canceling lunch request try to request it/));
    //             done();
    //         });
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie cancel"));
    //
    // });
    // it("responds when thanked", function(done) {
    //     adapter.on("reply", function(envelope, strings) {
    //         setTimeout(function(){
    //             assert.match(strings[0], (/You are welcome ;)/));
    //             done();
    //         }, 2000);
    //     });
    //
    //     adapter.receive(new TextMessage(user, "@lunchie thanks"));
    // });
    it("shows the rules when asked", function(done) {
        adapter.on("reply", function(envelope, strings) {
            setTimeout(function(){
                 expected = "1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.";
                 expect(strings.toString()).to.contain(expected);
                 done();
            }, 200);
        });

        adapter.receive(new TextMessage(user, "what are the three rules"));
    });

});
