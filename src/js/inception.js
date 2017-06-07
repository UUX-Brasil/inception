(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define([], factory(root));
  else if (typeof exports === 'object')
    module.exports = factory(root);
  else
    root.inception = factory(root);
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  // Errors


  // Inception Object

  var inceptionObject = function () {};

  inceptionObject.prototype.show = function (selector) {
    var _self = this;
    if (!selector)
      selector = _self.config.selector;

    if (_self.config.responsive)
      _resizeModalListener(_self.config, _self.modalHtml);

    selector.appendChild(_self.modalHtml);

    _self.config.onOpen();
  };

  inceptionObject.prototype.close = function () {
    var _self = this;
    var $currentModal = document.getElementById(_self.config.idDOM);

    if ($currentModal)
      $currentModal.remove();
    else
      throw 'Modal not found!';

    _self.config.onClose();
  };

  inceptionObject.prototype.closeOverlay = function () {
    var _self = this;
    var $currentModal = document.getElementById(_self.config.idDOM);

    var $currentOverlay = $currentModal.getElementsByClassName(overlayClass)[0];

    $currentOverlay.style.display = 'none';
  };

  inceptionObject.prototype.openOverlay = function () {
    var _self = this;
    var $currentModal = document.getElementById(_self.config.idDOM);

    var $currentOverlay = $currentModal.getElementsByClassName(overlayClass)[0];

    $currentOverlay.style.display = 'block';
  };


  inceptionObject.prototype.config = {};
  inceptionObject.prototype.modalHtml = '';


  function _inceptionObject(config, modalHtml) {
    var _currentInceptionObject = new inceptionObject();
    _currentInceptionObject.config = config;
    _currentInceptionObject.modalHtml = modalHtml;

    return _currentInceptionObject;
  }

  // Variables

  var inception = {},
    mainClass = 'inception-modal',
    mainId = 'modal',
    overlayClass = 'inception-overlay',
    contentClass = 'inception-content',
    fullScreenClass = 'full-screen';

  // Default config

  var _default = {
    id: 0,
    idDOM: '',
    innerHTML: '<span>Hello world!</span>',
    selector: document.body,
    height: '240px',
    width: '350px',
    fullScreen: false,
    opacity: 0.5,
    overlayColor: '#FFF',
    position: 'center',
    onClickOut: function () {
      return false;
    },
    onCreate: function () {
      return false;
    },
    onOpen: function () {
      return false;
    },
    onClose: function () {
      return false;
    },
    onDestroy: function () {
      return false;
    }
  };

  // Prototypes functions

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };

  Element.prototype.show = function () {
    document.body.appendChild(this);
  };

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement)
        this[i].parentElement.removeChild(this[i]);
    }
  };

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
  };


  // Private functions

  var _updateConfigs = function (oldConfig, newConfig) {
    var configs = {};

    configs = Object.assign(configs, oldConfig, newConfig);

    return configs;
  };

  var _createOverlay = function (overlayColor, opacity) {
    opacity = parseFloat(opacity);
    var $overlay = document.createElement('div');
    overlayColor = _hexToRgb(overlayColor);

    $overlay.className = overlayClass;
    $overlay.style.backgroundColor = 'rgba(' + overlayColor.r + ',' +
      overlayColor.g + ',' +
      overlayColor.b + ',' +
      opacity + ')';

    return $overlay;
  };

  var _createContent = function (config) {
    var $content = document.createElement('div');
    $content.className = contentClass;
    $content.innerHTML = config.innerHTML;

    return $content;
  };

  var _setModalStyles = function ($currentModal, width, height, fullScreen) {
    var $content = $currentModal.getElementsByClassName(contentClass)[0];

    if (!fullScreen) {
      $content.style.width = width;
      $content.style.height = height;
      $currentModal.classList.remove(fullScreenClass);
    } else {
      $content.style.width = '100%';
      $content.style.height = '100vh';

      if (!$currentModal.classList.contains(fullScreenClass))
        $currentModal.className += ' ' + fullScreenClass;
    }
  };

  var _createModalHtml = function (config) {
    var $currentInception = document.createElement('div');
    $currentInception.className = mainClass;
    $currentInception.id = config.idDOM;

    var $overlay = _createOverlay(config.overlayColor, config.opacity);
    var $content = _createContent(config);

    $currentInception.appendChild($overlay);
    $currentInception.appendChild($content);

    // Add ClickoutEvent
    $currentInception.getElementsByClassName(overlayClass)[0].addEventListener('click', config.onClickOut);

    return $currentInception;
  };

  var _getMainId = function (id) {
    return mainId + id;
  };

  var _destroyOverlay = function () {
    if (document.getElementsByClassName('inception-overlay').length === 1)
      document.getElementsByClassName('inception-overlay').remove();
  };

  var _getConfig = function (config) {
    var _destinationConfig = {};
    Object.assign(_destinationConfig, _default, config);

    _destinationConfig.id = new Date().getTime();
    _destinationConfig.idDOM = _getMainId(_destinationConfig.id);

    return _destinationConfig;
  };

  var _sortNumber = function (a, b) {
    return a - b;
  };

  var _getBreakpointRange = function (breakpoint) {

    var breakpointsRange = [320, 768, 990, 1200];

    breakpointsRange.push(breakpoint);
    breakpointsRange.sort(_sortNumber);

    breakpointsRange = breakpointsRange.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });

    var nextBreakpoint = breakpointsRange.indexOf(breakpoint) + 1;
    return breakpointsRange[nextBreakpoint];
  };

  var _responsiveModalProps = function (config, $currentModal, breakpoint) {
    breakpoint = parseInt(breakpoint);
    var maxBreakpoint = _getBreakpointRange(breakpoint),
      currentBreakpoint = config.responsive[breakpoint],
      width = config.width,
      height = config.height,
      fullScreen = config.fullScreen;

    if (breakpoint < 1200) {
      if (window.innerWidth > breakpoint && window.innerWidth < maxBreakpoint) {
        if (currentBreakpoint.width !== undefined)
          width = currentBreakpoint.width;
        if (currentBreakpoint.height !== undefined)
          height = currentBreakpoint.height;
        if (currentBreakpoint.fullScreen)
          fullScreen = currentBreakpoint.fullScreen;
      }

      _setModalStyles(
        $currentModal,
        width,
        height,
        fullScreen
      );
    }
  };


  var _resizeModalListener = function (config, $currentModal) {
    var breakpoints = Object.keys(config.responsive);

    breakpoints.forEach(function (breakpoint) {
      _responsiveModalProps(config, $currentModal, breakpoint);
      window.addEventListener('resize', function () {
        _responsiveModalProps(config, $currentModal, breakpoint);
      }, this);
    }, this);
  };


  // Methods

  inception.create = function (config) {
    var _currentConfig = _getConfig(config);
    var $htmlModal = _createModalHtml(_currentConfig);

    _setModalStyles($htmlModal, _currentConfig.width, _currentConfig.height, _currentConfig.fullScreen);

    return _inceptionObject(_currentConfig, $htmlModal);
  };

  inception.destroy = function () {
    _destroyOverlay();
  };

  inception.close = function (id) {
    var $mainObj = document.getElementById(id);
    $mainObj.remove();
  };

  inception.getModals = function () {
    var modals = document.querySelectorAll('.' + mainClass);

    return modals;
  };

  inception.getModal = function (id) {
    return document.getElementById(id);
  };

  inception.destroyAll = function () {
    var modals = document.querySelectorAll('.' + mainClass);

    Object.keys(modals).map(function (objectKey, index) {
      console.log(modals[objectKey].remove());
    });
  };

  return inception;

});