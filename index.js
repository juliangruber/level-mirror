module.exports = mirror;

function mirror(a, b, transform) {
  a.pre(function(change, add) {
    if (transform) {
      var kv = {
        key: change.key,
        value: change.value
      };
      kv = transform(kv);
      change.key = kv.key;
      change.value = kv.value;
    }

    change.prefix = b;
    add(change);
  });
}

