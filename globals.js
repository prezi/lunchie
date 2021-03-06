/*
 Global constants
 Author : Khaled Sami
 notes : Contains all the global constants in the code
*/

exports.timeRegex = /\b([0-9]{2})\:([0-9]{2})\b/i;
exports.helloRegex = /\b(h+e+l+l+o+)|(h+i+)|(info)|(h+e+y+)\b/i;
exports.cancelRegex = /\bcancel\b/i;
exports.helpRegex = /\bhelp\b/i;
exports.thanksRegex = /\b(thanks)|(thank you)|(thanks!)|(thx)|(thanks^^)|(thanks :\))|(cool)|(köszi)|(köszönöm)|(danke)\b/i;
exports.rulesRegex = /(what are )?the (three |3 )?(rules|laws)/i;



exports.minTimeforLunch = 12 * 60 + 30;
exports.maxTimeforLunch = 14 * 60 + 59;


exports.groupMaxSize = 4;
