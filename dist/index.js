'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('gittoken-api-middleware/dist/index');

var _index2 = _interopRequireDefault(_index);

var _gittoken = require('../gittoken.config');

var _gittoken2 = _interopRequireDefault(_gittoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 1324;

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json() // handle json data
);app.use(_bodyParser2.default.urlencoded({ extended: true }) // handle URL-encoded data
);app.use(_express2.default.static(process.cwd()));

var gittoken = new _index2.default(_gittoken2.default);

app.use('/gittoken', gittoken.routeRequests()

// let faucet = new Faucet({
//   dirPath: `${process.cwd()}/gittoken`,
//   keystoreFileName: `.keystore`,
//   web3Provider: `${protocol}://${host}:${port}`
// })
// app.use('/faucet', faucet.Router())


);app.listen(port, function () {
  console.log('GitToken Server Listening on Port ' + port);
});