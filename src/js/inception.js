(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.inception = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {
  
  // Inception Object

var inceptionObject = function(){};

inceptionObject.prototype.show = function(selector) {
  var _self = this;
  if(!selector)
    selector = _self.config.selector;

  selector.appendChild(_self.modalHtml);
}

inceptionObject.prototype.close = function(){
  var _self = this;
  var $currentModal = document.getElementById(_self.config.idDOM)

  if($currentModal)
    $currentModal.remove();  
  else  
    throw 'Modal not found!';  

}

inceptionObject.prototype.config = {};
inceptionObject.prototype.modalHtml = '';


function _inceptionObject(config, modalHtml) {
    var _currentInceptionObject = new inceptionObject();
    _currentInceptionObject.config = config;
    _currentInceptionObject.modalHtml = modalHtml;

    return _currentInceptionObject;
}



  // Variables

  var inception     = {},
      mainClass     = 'inception-modal',
      mainId        = 'modal',
      overlayClass  = 'inception-overlay',
      contentClass  = 'inception-content';



  // Prototypes functions

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  }

  Element.prototype.show = function () {
    document.body.appendChild(this);
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

  // Default config

  var _default = {
      id: 0,
      idDOM: '',
      innerHTML: '<span>Hello world!</span>',
      selector: document.body,
      height: 'auto',
      width: 'auto',
      fullScreen: false,
      opacity: 0.5,
      overlayColor: '#FFF',
      position: 'center',
      onClickOut: function() {		
        return false;
      },
      onCreate: function() {
        return false;
      },
      onOpen: function() {
        return false;
      },	
      onClose: function() {
        return false;
      },
      onDestroy: function() {
        return false;
      }
  };


  // Private functions

  var _createOverlay = function (overlayColor, opacity) {
      opacity = parseFloat(opacity);
      var $overlay = document.createElement('div');
      overlayColor = _hexToRgb(overlayColor);

      $overlay.className = overlayClass;
      $overlay.style.backgroundColor = 'rgba(' + overlayColor.r + ',' + overlayColor.g + ',' + overlayColor.b + ',' + opacity + ')';

      return $overlay;
  }

  var _createContent = function(config) {
    var $content = document.createElement('div');
    $content.className = contentClass;
    $content.innerHTML = config.innerHTML;

    return $content;
  }

  var _createModalHtml = function(config) {
    var $currentInception = document.createElement('div');
    $currentInception.className = mainClass;
    $currentInception.id = config.idDOM;

    var $overlay = _createOverlay(config.overlayColor, config.opacity);
    var $content = _createContent(config);

    $currentInception.appendChild($overlay);
    $currentInception.appendChild($content);

    return $currentInception;
  }

  var _getMainId = function(id) {
    return mainId + id;
  }

  var _destroyOverlay = function () {
    if (document.getElementsByClassName('inception-overlay').length === 1)
      document.getElementsByClassName('inception-overlay').remove();
  }

  var _getConfig = function(config) {
      var _destinationConfig = {};
      Object.assign(_destinationConfig, _default, config);

      _destinationConfig.id = new Date().getTime();
      _destinationConfig.idDOM = _getMainId(_destinationConfig.id);

      return _destinationConfig;
  }


  

  // Methods

  inception.create = function (config) {
    var _currentConfig = _getConfig(config);
    console.log(_currentConfig);
    var $htmlModal = _createModalHtml(_currentConfig);

    return _inceptionObject(_currentConfig, $htmlModal);
  }

  inception.destroy = function () {
    _destroyOverlay();
  }

  return inception;

});