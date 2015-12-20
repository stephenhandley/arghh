var Assert = require('assert')
var Arghh  = require('./index');

var rg = Arghh({
    one : Arghh,
    two : 1
});

module.exports = {
    Arghh : {
        'set default args' : function() {
            var value = rg({
                one : 1
            });

            Assert.deepEqual(value, {
                one : 1,
                two : 1
            });
        },

        'override default args' : function() {
            var value = rg({
                one : 1,
                two : 2
            });

            Assert.deepEqual(value, {
                one : 1,
                two : 2
            });
        },

        'throw error on missing args' : function() {
            Assert.throws(function() {
                var value = rg({
                    two: 2
                });
            }, 'Missing arg: one');
        }
    }
};