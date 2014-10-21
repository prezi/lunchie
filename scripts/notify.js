
get_lunch_partners = require('./../lib/answer').get_lunch_partners;

module.exports = function(robot) {
	robot.respond(/notify/i, function(msg) {
		var lunch_date = new Date();
		lunch_date.setMinutes(lunch_date.getMinutes() + 15);
		var lunch_time = lunch_date.getHours() + ":" + lunch_date.getMinutes();
        console.log("lunch time is " + lunch_time);
		var groups = get_lunch_partners(lunch_time);
		for(var gi in groups) {
            var group = groups[gi];
            if(group.length == 1) {
				console.log("Hey @" + group[0] + ", unfortunately, no body signed up for lunch time at " + 
					lunch_time + ". Enjoy your meal!");
			} else {
                var response_text = "Enjoy your meal at " + lunch_time + ". Your lunch partners are:\n@" + group.join('\n@');
				for(var mi in group) {
                    var member = group[mi];
                    var user = {mention_name: member};
                    //send
                    robot.send(user, "Hey @" + member + ", "+ response_text.replace(member + "\n", ""));
				}
			}
		}
	});

}