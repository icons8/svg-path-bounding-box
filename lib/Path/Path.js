var
  BoundingBox = require('./BoundingBox'),
  BoundingBoxView = require('./BoundingBoxView'),
  SvgPath = require('svgpath');

module.exports = Path;

function Path(d) {
  this.d = d;
}

Path.prototype = {

  getBoundingBox: function() {
    var
      pathDriver,
      boundingBox;

    pathDriver = new SvgPath(this.d);
    boundingBox = new BoundingBox();

    pathDriver
      .abs()
      .unarc()
      .unshort()
      .iterate(function(seg, index, x, y) {

        switch(seg[0]) {
          case 'M':
          case 'L':
            boundingBox.addPoint(
              seg[1],
              seg[2]
            );
            break;
          case 'H':
            boundingBox.addX(seg[1]);
            break;
          case 'V':
            boundingBox.addY(seg[1]);
            break;
          case 'Q':
            boundingBox.addQuadraticCurve(
              x,
              y,
              seg[1],
              seg[2],
              seg[3],
              seg[4]
            );
            break;
          case 'C':
            boundingBox.addBezierCurve(
              x,
              y,
              seg[1],
              seg[2],
              seg[3],
              seg[4],
              seg[5],
              seg[6]
            );
            break;
        }

      });

    return new BoundingBoxView(boundingBox);
  }

};
