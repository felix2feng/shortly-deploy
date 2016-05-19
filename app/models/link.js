var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');


db.UrlSchema.methods.initialize = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.urll);
  this.code = shasum.digest('hex').slice(0, 5);
};

var Link = mongoose.models('Urls', db.UrlSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
