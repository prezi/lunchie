//necessary to read the file
var fs = require("fs");

//functions to help using other js file
//where the stroe JSON string is located
function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}

//string formatting method to easily insert strings.
//Source: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

//array shuffle method
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//helper function to shuffle the arrays associated with the time-keys
function shuffleTimeArray(time_array)
{
	for (var key in time_array)
	{
		//calling shuffle multiple times, because in practice
		//it seems that calling shuffle only once is not accaptably random
		time_array[key] = shuffle(time_array[key]);
		time_array[key] = shuffle(time_array[key]);
		time_array[key] = shuffle(time_array[key]);
	}
	return time_array;
}

//answer formatting method
function sendMsg(name_list,time)
{
	var i;
	for(i=0;i<name_list.length;i++)
	{
		//others contains the people in the group besides the addressed person
		var others=new Array();
		var j;
		for (j=0;j<name_list.length;j++)
		{
			if (i!==j)
			{
				others.push(name_list[j]);
			}
		}
		var msg="Hey {0}! You are paired up with".format(name_list[i]);
		if (others.length>1)
		{
			for (j=0;j<others.length;j++)
			{
				if (j===others.length-1)
				{
					msg+=' and {0}'.format(others[j]);
				}
				else if (j===others.length-2) {
					msg+=' {0}'.format(others[j]);
				}
				else
				{
					msg+=' {0},'.format(others[j]);
				}				
			}			
		}
		else
		{
			msg+=' {0}'.format(others[0]);
		}
		msg+=" for lunch. Let's meet {0} at {1} {2}. Bon appétit!".format((others.length>1)? 'them':'him/her',time,'');
		console.log(msg);
	}
}

//send message to those who have no pairs
function sendAlternativeMessage(name_list,time)
{
	console.log('Hey {0}! You signed up for lunch at {1}. \
Sorry to say, but nobody else signed up for this timeslot. \
don\'t worry, I\'m sure, that you can find some buddies to have lunch with. :]'.format(name_list[0],time) );
}

//This function forms groups from the arrays
//normally each group has 4 members
//if it's not possible it tries to create equal groups from those who remains (the last <8 person)
function createGroupsAndSend(time_array) {
	for (var key in time_array) {
		var name_list=time_array[key];
		while (name_list.length>8) {
			var i;
			var group=new Array();
			for (i=0;i<4;i++) {
				group.push(name_list.pop());
			}
			sendMsg(group,key);
		}
		if (name_list.length>4) {
			var i;
			var group=new Array();
			var half_size=Math.floor(name_list.length/2)
			for(i=0;i<half_size;i++) {
				group.push(name_list.pop());
			}
			sendMsg(group,key);
		}
		if (name_list.length>1) {
			sendMsg(name_list,key);
		} else {
			sendAlternativeMessage(name_list,key);
			// TO DO
			// This case there's only one person in the given timeslot.
			// We should decide how to handle this case.
		}
	}
}

//receives a list of names with the associated timeslot
//returns a JSON object where each timeslot is associated with a list of names.
function date_list(store) {
	var ret = {}; // what does ret stand for? 
	for (var key in store) {
		var timeval=store[key];

		if (timeval in ret) {
			// console.log("already here")
			ret[timeval].push(key);
		} else {
			// console.log("not in hash map")
			ret[timeval]=[key];
		}
	}
	console.log(ret);
	return ret;
}

//the "main" part of the function
if (!module.parent) {
 	//default input
  	var inf='input0.txt';

  	//arg parsing
	process.argv.forEach(function (val, index, array) {
	  if (index==2) {
	  	inf=val;
	  }
	});

	//including the store variable
	include(inf);

	//first create the namelist for the different timeslots
	var time_arrays=date_list(store);
	//shuffle each array
	time_arrays=shuffleTimeArray(time_arrays);
	//forms groups and sends the messages
	createGroupsAndSend(time_arrays);

	////just for test
	for (key in time_arrays) {
		console.log('{0}: {1}'.format(key,time_arrays[key]));
	}

}



// for Mocha unit test located in spec directory
module.exports.date_list = date_list;
module.exports.shuffleTimeArray = shuffleTimeArray;
module.exports.shuffle = shuffle;
