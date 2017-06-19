describe('Inception', function () {
	var hasElement = function (element) {
		return document.body.contains(document.querySelector(element));
	}

	describe('Should initialize plugin', function () {

		beforeEach(function () {
			inception.create({
				innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
				selector: document.body
			});
		});

		it('Document should include the inception module', function () {
			expect(!!inception).toBe(true);
		});
	});

	describe('Should have opened', function () {

		beforeEach(function() {
			var modal = inception.create({
				innerHTML: '<div><h2>Hello world!</h2><button id="btnInceptionClose">Fechar</button></div><button id="btnNewModal">Abrir novo modal</button>',
				selector: document.body
			});

			modal.show();
		});

		it('Should have opened', function () {
			expect(hasElement('.inception.fefef')).toBe(false);
		});
	});

});