'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gitterService;

var _nodeGitter = require('node-gitter');

var _nodeGitter2 = _interopRequireDefault(_nodeGitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gitterService() {
  var _this = this;

  this.gitter = new _nodeGitter2.default(this.gitterToken);
  this.gitter.rooms.join(this.gitterRoomName).then(function (room) {
    _this.gitterRoom = room;
  }).catch(function (error) {
    console.log('Error connecting to Gitter Service');
  });
}