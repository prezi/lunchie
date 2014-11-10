//cancel lunch request
User = require('./../model').User;

function cancelLunch(jid) {
  User.find({where : {'jid': jid}}).success(function(usr){
  	if (usr) {
  		usr.updateAttributes({rounded_time: null, request_time: null});
  	}
  });
}

module.exports.cancelLunch = cancelLunch;