'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _index = require('./events/index');

var _index2 = require('./utils/index');

var _index3 = require('./github/index');

var _index4 = require('./contracts/index');

var _index5 = _interopRequireDefault(_index4);

var _index6 = require('./mysql/index');

var _index7 = require('./routers/index');

var _index8 = require('./middleware/index');

var _index9 = require('./integrations/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenServer = function (_GitTokenContracts) {
  (0, _inherits3.default)(GitTokenServer, _GitTokenContracts);

  function GitTokenServer(_ref) {
    var mysqlOpts = _ref.mysqlOpts,
        _ref$api = _ref.api,
        port = _ref$api.port,
        sessionSecret = _ref$api.sessionSecret,
        gittokenParams = _ref.gittokenParams,
        githubCredentials = _ref.githubCredentials,
        gitterWebHookUrl = _ref.gitterWebHookUrl,
        gitterToken = _ref.gitterToken,
        gitterRoomName = _ref.gitterRoomName,
        dirPath = _ref.dirPath,
        address = _ref.address,
        recoveryShare = _ref.recoveryShare,
        web3Provider = _ref.web3Provider;
    (0, _classCallCheck3.default)(this, GitTokenServer);

    /* Bind Options*/
    var _this = (0, _possibleConstructorReturn3.default)(this, (GitTokenServer.__proto__ || (0, _getPrototypeOf2.default)(GitTokenServer)).call(this, { dirPath: dirPath, address: address, recoveryShare: recoveryShare, web3Provider: web3Provider }));

    _this.port = port;
    _this.gittokenParams = gittokenParams;
    _this.githubCredentials = githubCredentials;
    _this.gitterWebHookUrl = gitterWebHookUrl;
    _this.gitterToken = gitterToken;
    _this.gitterRoomName = gitterRoomName;
    _this.sessionSecret = sessionSecret;
    _this.web3Provider = web3Provider;

    /* Bind Methods */
    _this.query = _index6.query.bind(_this);
    _this.AuthRouter = _index7.AuthRouter.bind(_this);
    _this.WebHookRouter = _index7.WebHookRouter.bind(_this);
    _this.ApiRouter = _index7.ApiRouter.bind(_this);
    _this.AccountRouter = _index7.AccountRouter.bind(_this);
    _this.WebHookMiddleware = _index8.WebHookMiddleware.bind(_this);
    _this.SaveUserMiddleware = _index8.SaveUserMiddleware.bind(_this);
    _this.VerifyAccountMiddleware = _index8.VerifyAccountMiddleware.bind(_this);
    _this.parseContribution = _index2.parseContribution.bind(_this);
    _this.validateWebHookRequest = _index2.validateWebHookRequest.bind(_this);
    _this.signContribution = _index2.signContribution.bind(_this);
    _this.saveContribution = _index6.saveContribution.bind(_this);
    _this.saveUserBalance = _index6.saveUserBalance.bind(_this);
    _this.saveTotalSupply = _index6.saveTotalSupply.bind(_this);
    _this.getContributions = _index6.getContributions.bind(_this);
    _this.getTokenSupply = _index6.getTokenSupply.bind(_this);
    _this.getUserBalances = _index6.getUserBalances.bind(_this);
    _this.saveUserDetails = _index6.saveUserDetails.bind(_this);
    _this.getUserDetails = _index6.getUserDetails.bind(_this);
    _this.saveEndUserLicenseAgreement = _index6.saveEndUserLicenseAgreement.bind(_this);
    _this.getEndUserLicenseAgreement = _index6.getEndUserLicenseAgreement.bind(_this);
    _this.updateUserAddress = _index6.updateUserAddress.bind(_this);

    _this.handleContribution = _index2.handleContribution.bind(_this);
    _this.handleEventActions = _index2.handleEventActions.bind(_this);
    _this.handlePingEvent = _index.handlePingEvent.bind(_this);
    _this.createOrgWebHook = _index3.createOrgWebHook.bind(_this);
    _this.getOrganizations = _index3.getOrganizations.bind(_this);

    /* Gitter WebHook Integration */
    _this.gitterService = _index9.gitterService.bind(_this);

    _this.gitterService();
    _this.gitterWebHook = _index9.gitterWebHook.bind(_this);
    _this.gitterLogContributionActivity = _index9.gitterLogContributionActivity.bind(_this);

    /* MySql Connection */
    _this.mysql = _mysql2.default.createConnection(mysqlOpts);

    /* Express Application */
    _this.app = (0, _express2.default)();
    _this.app.use((0, _cors2.default)());
    _this.app.use(require('cookie-parser')());
    _this.app.use(require('express-session')({
      secret: _this.sessionSecret,
      resave: true,
      saveUninitialized: true
    }));
    _this.app.use(_bodyParser2.default.json()); // handle json data
    _this.app.use(_bodyParser2.default.urlencoded({ extended: true })); // handle


    _this.app.use('/api/', _this.ApiRouter());
    _this.app.use('/auth/', _this.AuthRouter());
    _this.app.use('/webhook/', _this.WebHookRouter());
    // this.app.use('/account', this.AccountRouter());

    // Serve Web Application UI
    _this.app.use('/', _express2.default.static(process.cwd() + '/ui/'));

    _this.app.use(function (req, res) {
      res.redirect('/');
    });

    /* Run GitToken Server */
    _this.listen();
    return _this;
  }

  /**
   * [listen description]
   * @return {[type]} [description]
   */


  (0, _createClass3.default)(GitTokenServer, [{
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.app.listen(this.port, function () {
        console.log('GitToken Server Listening on Port ' + _this2.port);
      });
    }
  }]);
  return GitTokenServer;
}(_index5.default);

exports.default = GitTokenServer;