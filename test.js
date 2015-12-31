var Assert = require('assert')
var Arghh  = require('./index');

var arghh;

module.exports = {
    Arghh : {
      'properly handle required args' : {
        beforeEach: function () {
          arghh = Arghh({
            required : [['ids', 'query'], 'key', 'derp'],
            defaults : {
              key : 12345
            }
          });
        },

        'by throwing when missing single arg' : function () {
          Assert.throws(function () {
            arghh({
              ids : 2345
            });
          }, 'Missing arg named derp');
        },

        'by throwing when none of group' : function () {
          Assert.throws(function () {
            arghh({
              derp : 1000
            });
          }, 'Must pass one of [ids, query]');
        },

        'by throwing when more than one of group' : function () {
          Assert.throws(function () {
            arghh({
              ids   : 10234,
              query : 'omg',
              derp  : 1000
            });
          }, 'Must pass one of [ids, query]');
        },

        'by not throwing when missing defaulted required arg' : function () {
          Assert.doesNotThrow(function () {
            arghh({
              derp  : 10,
              query : 'blah'
            })
          });
        }
      },

      'throw error when arg in both optional and required' : function () {
        Assert.throws(function () {
          Arghh({
            required : [['donkey', 'honkey']],
            optional : ['donkey']
          })();
        }, 'Arg named donkey cannot be required and optional');
      },

      'throw error when arg is defaulted but not specified': function () {
        Assert.throws(function () {
          Arghh({
            defaults : {
              donkey : 100
            }
          })();
        }, 'Arg named donkey defaulted but not specified');
      },

      'properly restrict result keys to specified args' : function () {
        arghh = Arghh({
          required : ['a'],
          optional : ['b', 'c']
        });

        var result = arghh({
          a : 1,
          b : 2,
          c : 3,
          d : 4,
          e : 5
        });

        var expected = {
          a : 1,
          b : 2,
          c : 3
        };

        Assert.deepEqual(result, expected);
      },

      'properly handle defaults' : {
        beforeEach : function () {
          arghh = Arghh({
            optional : ['languages', 'types', 'indent', 'prefix', 'limit'],
            defaults : {
              languages : 'en',
              indent    : false,
              prefix    : true,
            }
          });
        },

        'by setting missing args with defaults values' : function () {
          var result = arghh({
            limit : 2,
          });

          var expected = {
            languages : 'en',
            indent    : false,
            prefix    : true,
            limit     : 2,
          }

          Assert.deepEqual(result, expected);
        },

        'by overriding default values when passed' : function () {
          var result = arghh({
            indent : true
          });

          var expected = {
            languages : 'en',
            indent    : true,
            prefix    : true
          };
          Assert.deepEqual(result, expected);
        }
      }
    }
};
