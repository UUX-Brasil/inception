/*!
 * inception v1.0.0: Inception Modal Plugin
 * (c) 2017 
 * ISC License
 * git+https://github.com/UUX-Brasil/inception.git
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.inception = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  // Variables

  var inception = {},
    overlayClass = 'inception-overlay';

  // Prototypes functions

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  }
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement)
        this[i].parentElement.removeChild(this[i]);
    }
  }

  // Helpers

  var _hexToRgb = function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Private functions

  var _createOverlay = function (selector, overlayColor, opacity) {
    if (document.getElementsByClassName('inception-overlay').length === 0) {
      if (!overlayColor)
        overlayColor = '#000';

      if (!opacity)
        opacity = parseFloat('0.5');
      else
        opacity = parseFloat(opacity);

      var overlay = document.createElement('div');

      overlayColor = _hexToRgb(overlayColor);

      overlay.className = overlayClass;
      overlay.style.backgroundColor = 'rgba(' + overlayColor.r + ',' + overlayColor.g + ',' + overlayColor.b + ',' + opacity + ')';
      
      selector.appendChild(overlay);
    }
  }

  var _destroyOverlay = function () {
    if (document.getElementsByClassName('inception-overlay').length === 1)
      document.getElementsByClassName('inception-overlay').remove();
  }

  // Methods

  inception.create = function (configs) {
    _createOverlay(configs.selector, configs.overlayColor, configs.opacity);
  }

  inception.destroy = function () {
    _destroyOverlay();
  }

  return inception;

});