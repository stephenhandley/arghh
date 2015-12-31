function Arghh (config) {
  var required = config.required || [];
  var optional = config.optional || [];
  var defaults = config.defaults || {};

  var all = optional.slice();
  required.forEach(function (key) {
    if (optional.indexOf(key) !== -1) {
      throw new Error('Arg named ' + key + ' cannot be required and optional');
    }

    if (Array.isArray(key)) {
      all = all.concat(key);
    } else {
      all.push(key);
    }
  });

  function specifiedKey(key) {
    return (all.indexOf(key) !== -1);
  }

  return function (args) {
    var result = {};

    // 1. copy over valid args
    Object.keys(args).forEach(function (key) {
      if (specifiedKey(key)) {
        result[key] = args[key];
      }
    });

    // 2. if a defaulted arg isn't present, add it
    Object.keys(defaults).forEach(function (key) {
      if (!specifiedKey(key)) {
        throw new Error('Arg named ' + key + ' defaulted but not specified');
      }

      if (!(key in result)) {
        result[key] = defaults[key]
      }
    });

    // 3. make sure required args are present
    required.forEach(function (key) {
      if (!Array.isArray(key)) {
        if (!(key in result)) {
          throw new Error('Missing arg named ' + key);
        }
        return;
      }

      // for required args that are arrays, one and only should be present
      var has_none = true;
      var has_many = false;

      var keys = key;
      keys.forEach(function (key) {
        if (key in result) {
          // order is important: check current has_none before setting below
          if (!has_none) {
            has_many = true;
          }
          
          has_none = false;
        }
      });

      if (has_none || has_many) {
        var key_list = '[' + keys.join(', ') + ']';
        throw new Error('Must pass one of ' + key_list);
      }
    });

    return result;
  };
}

module.exports = Arghh;
