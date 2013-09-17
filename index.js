module.exports = mirror;

function mirror(a, b, transform) {
  if (Array.isArray(transform)) {
    var props = transform;
    transform = function(value) {
      return props.reduce(function(acc, prop) {
        acc[prop] = value[prop];
        return acc;
      }, {});
    }
  }

  a.pre(function(change, add) {
    if (transform && change.type == 'put') {
      change.value = transform(change.value);
      if (change.value === undefined) return;
    }

    change.prefix = b;
    add(change);
  });
}

