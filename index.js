function Arghh(defaults) {
    return function(args) {
        var result = {};

        Object.keys(defaults).forEach(function(key) {
            if (key in args) {
                result[key] = args[key];
            } else {
                var def = defaults[key];

                if (def === Arghh) {
                    throw new Error('Missing arg: ' + key);
                } else {
                    result[key] = def;
                }
            }
        });

        return result;
    };
}

module.exports = Arghh;