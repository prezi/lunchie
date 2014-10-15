
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

function Reply(msg)
{
	console.log(msg);
}
function throwError(location,msg)
{
	Reply('ERROR in {0}, message: {1}'.format(location,msg));
}

function business_logic(line)
{
	var a,b;
    a=line.split(';');
    b=a[1];
    a=a[0];
	//console.log("a: {0} b: {1}".format(a,b));
	if(/\d{1,2}:\d{1,2}/i.test(b))
	{
		//console.log("it's a time data");
		var dat={};
		var splitted_date=b.split(':');
		dat['hours']=parseInt(splitted_date[0]);
		dat['minutes']=parseInt(splitted_date[1]);
		
		//console.log(dat['hours'].toString());
		if (dat['hours']>=0 && dat['hours']<3)
		{
			dat['hours']+=12;
		}
		if (dat['hours']<12 || dat['hours']>14 || (dat['hours']===12 && dat['minutes']<30) || dat['minutes']<0 || 59<dat['minutes'])
		{
			throwError('datecheck','date ({0}) does not fit in time interval: 12:30-14:59'.format(b));
		}
		else
		{
			//Reply('You entered: {0}'.format(b));
			var temp_old=dat['minutes'].toString();
			dat['minutes']=Math.floor((dat['minutes']/15))*15;
			//Reply('You entered {0}:{1} is rounded to {2}:{3}'.format(dat['hours'],temp_old,dat['hours'],dat['minutes'].toString()));
			store[a]='{0}:{1}'.format(dat.hours.toString(),dat.minutes.toString());
			//console.log("{0}; {1} store length: {2}".format(a,store[a],store.length.toString()));

		}
	}
	else
	{
		//console.log("it's NOT a time data")
		if (b.toLowerCase()==='cancel')
		{
			if (a in store)
			{
				delete store[a];
				Reply("You successfully cancelled your lunch appointment.")
			}
			else
			{
				throwError('Cancel lunch',"You cancelled the lunch, but you didn't had any appointment yet.");
			}
		}
		else
		{
			if (b.length==0)
			{
				throwError('dateParser',"Your message is empty");	
			}
			else
			{			
				throwError('dateParser',"I couldn't understand your message. you wrote: {0}".format(b));
			}
			
		}
	}
}

if (!module.parent) {
  // this is the main module
  var inf='input.txt';

process.argv.forEach(function (val, index, array) {
  if (index==2)
  {
  	inf=val;
  }
});

var store={};

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream(inf),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
	if (line.length>0)
	{
		business_logic(line);
	}
});
rd.on('pause',function()
{
	for(key in store)
	{
		console.log("lunchmate {0} timeslot: {1}".format(key,store[key]));
	}
})
}


