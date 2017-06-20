describe('Inception', function () {
  var inceptionClass = '.inception-modal';
  var hasElement = function (element) {
    return document.body.contains(document.querySelector(element));
  };

  describe('Internal method', function () {
    it('Should have create', function (done) {
      inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });
      expect(!!inception).toBe(true);
      done();
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

      modal.close();
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

    it('Should have update', function (done) {
      var myModal = inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });

      myModal.updateHTML('<h2>Modal novo</h2>');
      expect(myModal.config.innerHTML).toEqual('<h2>Modal novo</h2>');

      done();      
    });

    it('Should have close overlay', function (done) {
      var modal = inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });

      modal.show();
      modal.closeOverlay();

      var currentModal = document.getElementById(modal.config.idDOM),
          overlayDisplay = currentModal.querySelector('.inception-overlay').style.display;                  

      expect(hasElement('#' + modal.config.idDOM)).toBe(true);      
      expect(overlayDisplay).toEqual('none');
      done();
      
      modal.close();
    });

    it('Should have open overlay', function (done) {
      var modal = inception.create({
        innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
        selector: document.body
      });

      modal.show();
      modal.closeOverlay();
      modal.openOverlay();
      
      var currentModal = document.getElementById(modal.config.idDOM),
          overlayDisplay = currentModal.querySelector('.inception-overlay').style.display;                  

      expect(hasElement('#' + modal.config.idDOM)).toBe(true);      
      expect(overlayDisplay).toEqual('block');
      done();

      modal.close();
    });
  });

});