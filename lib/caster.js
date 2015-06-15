var
  Path = require('./Path/Path');

module.exports = caster;

function caster(path) {
  return new Path(path).getBoundingBox();
}

caster.Path = Path;