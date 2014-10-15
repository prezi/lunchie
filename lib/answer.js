//console.log("Hello world");
var fs = require("fs");

function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}

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

//seeding?
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function shuffleTimeArray(time_array)
{
	for (key in time_array)
	{
		time_array[key]=shuffle(time_array[key]);
		time_array[key]=shuffle(time_array[key]);
		time_array[key]=shuffle(time_array[key]);
	}
	return time_array;
}

function sendMsg(name_list,time)
{
	var i;
	for(i=0;i<name_list.length;i++)
	{
		//TO DO change this part
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

function sendAlternativeMessage(name_list,time)
{
	console.log('Hey {0}! You signed up for lunch at {1}. \
Sorry to say, but nobody else signed up for this timeslot. \
don\'t worry, I\'m sure, that you can find some buddies to have lunch with :]'.format(name_list[0],time) );
}

function createGroupsAndSend(time_array)
{
	for (key in time_array)
	{
		name_list=time_array[key];
		while (name_list.length>8)
		{
			var i;
			var group=new Array();
			for (i=0;i<4;i++)
			{
				group.push(name_list.pop());
			}
			sendMsg(group,key);
		}
		if (name_list.length>4)
		{
			var i;
			var group=new Array();
			var half_size=Math.floor(name_list.length/2)
			for(i=0;i<half_size;i++)
			{
				group.push(name_list.pop());
			}
			sendMsg(group,key);
		}
		if (name_list.length>1)
		{
			sendMsg(name_list,key);
		}
		else
		{
			sendAlternativeMessage(name_list,key);
			// TO DO
			// This case there's only one person in the given timeslot.
			// We should decide how to handle this case.
		}
	}
}

function date_list(store)
{
	ret={};
	for (key in store)
	{
		var timeval=store[key];
		if (ret.hasOwnProperty(timeval))
		{
			ret[timeval].push(key);
		}
		else
		{
			ret[timeval]=new Array();
			ret[timeval].push(key);
		}
	}
	return ret;
}

if (!module.parent) {
 	// this is the main module
  	var inf='input0.txt';

	process.argv.forEach(function (val, index, array) {
	  if (index==2)
	  {
	  	inf=val;
	  }
	});
	include(inf);

	var time_arrays=date_list(store);
	time_arrays=shuffleTimeArray(time_arrays);
	createGroupsAndSend(time_arrays);
	for (key in time_arrays)
	{
		console.log('{0}: {1}'.format(key,time_arrays[key]));
	}

}