 //cancel lunch requests:

store = require('./../lib/collect').store;
jid_store = require('./../lib/collect').jid_store;

function cancelLunch(mention_name) {
  if (mention_name in store) {
    delete store[name];
    delete jid_store[name];
  }
  console.log("store", store);
  console.log("jid_store", jid_store);
}

module.exports.cancelLunch = cancelLunch;