var Assert = require('assert')
var Rg     = require('./index');

var rg = Rg({
    one : Rg,
    two : 1
});

module.exports = {
    Rg : {
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