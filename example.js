// This is an example from the Google Knowledge Graph API
// https://developers.google.com/knowledge-graph/?hl=en

// - key and one of query or ids are required arguments
// - languages, types, indent, prefix, and limit are all optional
// - key, languages, indent, and prefix receive default values when omitted
var Arghh = require('./index');
var Assert = require('assert');

var arghh = Arghh({
  required : ['key', ['query', 'ids']],
  optional : ['languages', 'types', 'indent', 'prefix', 'limit'],
  defaults : {
      key       : 'jk283h43lka3h2hq',
      languages : 'en',
      indent    : false,
      prefix    : true
  }
});

var result = arghh({
  query   : 'honkey',
  limit   : 100,
  prefix  : false,
  ignored : 20
});

Assert.deepEqual(result, {
  query     : 'honkey',
  limit     : 100,
  key       : 'jk283h43lka3h2hq',
  languages : 'en',
  indent    : false,
  prefix    : false
});

Assert.throws(function () {
  arghh({
    key : 'abcdefg'
  });
}, 'Must pass one of [query, ids]');
