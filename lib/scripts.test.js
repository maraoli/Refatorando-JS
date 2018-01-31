'use strict';

var _scripts = require('./scripts');

var _scripts2 = _interopRequireDefault(_scripts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('testa se está adicionado item', function () {
    _scripts2.default.adiciona("Titulo", "Texto");
    expect(_scripts2.default.contaTotal()).toBe(1);
});