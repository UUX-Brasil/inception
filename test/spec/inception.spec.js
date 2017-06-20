describe('Inception', function () {
  var inceptionClass = '.inception-modal';
  var hasElement = function (element) {
    return document.body.contains(document.querySelector(element));
  };

  describe('Internal method', function () {

    beforeEach(function () {
      inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });
    });

    it('Should have create', function () {
      expect(!!inception).toBe(true);
    });
  });

  describe('External Methods', function () {
    var originalTimeout;
    beforeEach(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('Should have opened', function (done) {
      var modal = inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });

      modal.show();
      expect(hasElement('#' + modal.config.idDOM)).toBe(true);
      done();
    });

    it('Should have closed', function (done) {
      var modal = inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });

      modal.show();
      expect(hasElement('#' + modal.config.idDOM)).toBe(true);
      modal.close();
      expect(hasElement('#' + modal.config.idDOM)).toBe(false);
      done();
    });
  });

});