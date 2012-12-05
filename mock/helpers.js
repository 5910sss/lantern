function getByPath(obj, path, defaultVal) {
  path = (path || '').split('.');
  for (var i=0, name=path[i];
       name && typeof obj != 'undefined';
       obj=name ? obj[name] : obj, name=path[++i]);
  if (typeof obj == 'undefined' && typeof defaultVal != 'undefined')
    return defaultVal;
  return obj;
}

function deleteByPath(obj, path) {
  path = (path || '').split('.');
  var name = path[0], i = 0, l = path.length;
  for (; i<l-1 && path[i+1]; ++i) {
    obj = obj[name];
    name = path[i+1];
  }
  if (i == l - 1)
    delete obj[name];
}

function merge(dst, path, src, overwrite) {
  var path = path.split('.'), last = path.slice(-1)[0];
  for (var i=0, name=path[i], l=path.length; i<l-1; name=path[++i]) {
    if (typeof dst[name] != 'object' && path[i+1])
      dst[name] = {};
    dst = dst[name];
  }
  if (Array.isArray(src)) {
    if (last)
      dst[last] = src.slice();
    else
      dst = src.slice();
  } else if (typeof src != 'object') {
    if (last)
      dst[last] = src;
    else
      dst = src;
  } else {
    if (last) {
      if (typeof dst[last] != 'object') 
        dst[last] = {};
      dst = dst[last];
    }
    for (var key in src) {
      if (overwrite) {
        dst[key] = src[key];
      } else {
        merge(dst, key, src[key]);
      }
    }
  }
}

function validatePasswords(pw1, pw2) {
  return pw1 && pw2 && pw1 == pw2;
}

exports.getByPath = getByPath;
exports.deleteByPath = deleteByPath;
exports.merge = merge;
exports.validatePasswords = validatePasswords;
