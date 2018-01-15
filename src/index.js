require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
require('../node_modules/ui-select/dist/select.min.css');
require('../node_modules/select2/dist/css/select2.min.css');
require('../node_modules/selectize/dist/css/selectize.css');
require('../node_modules/angular-ui-tree/dist/angular-ui-tree.min.css');
require('../node_modules/angular-toastr/dist/angular-toastr.min.css');
require('../node_modules/angular-bootstrap-colorpicker/css/colorpicker.min.css');
require('../node_modules/ng-verify/css/ngVerify.css');
require('../node_modules/angular-block-ui/dist/angular-block-ui.min.css');


const appModule = require('./app/common/lkapp.module.js');
const appConfig = require('./app/app.config.js');
const appRun = require('./app/app.run.js');
const appService = require('./app/common/constant.service');
const appRouter = require('./app/common/all.router');

// 加载angular的配置文件以及初始运行的文件
appRun(appModule);
appConfig(appModule);


//加载公共service、router
appService(appModule);
appRouter(appModule);

//定义底层控制器
appModule.controller('mainCtrl',['$rootScope','$scope',($rootScope,$scope) => {
    console.log($rootScope);
    console.log($scope);
}]);

//当文档加载完毕时注入angular模块
angular.element(document).ready(function () {
    angular.bootstrap(document, ['lkApp']);
});