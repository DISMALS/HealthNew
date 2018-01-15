module.exports = appModule => {
    // 引入路由文件
    const allRouter = require('./common/all.router')(appModule);

    //引入语言转换json文件
    const enUS = require('./i18n/en-US');
    const zhCN = require('./i18n/zh-CN');
    appModule.config([
        '$urlRouterProvider',
        '$ocLazyLoadProvider',
        '$locationProvider', 
        '$stateProvider', 
        '$controllerProvider', 
        '$compileProvider', 
        '$filterProvider', 
        '$provide', 
        '$httpProvider', 
        'blockUIConfig', 
        'treeConfig', 
        'toastrConfig', 
        '$cookiesProvider',
        '$qProvider',
        '$translateProvider',
        ($urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, blockUIConfig, treeConfig, toastrConfig, $cookiesProvider,$qProvider,$translateProvider) => {
            appModule.controller = $controllerProvider.register;
            appModule.directive = $compileProvider.directive;
            appModule.filter = $filterProvider.register;
            appModule.factory = $provide.factory;
            appModule.service = $provide.service;
            appModule.constant = $provide.constant;

            // console.log($httpProvider);
            // console.log($urlRouterProvider);

            $ocLazyLoadProvider.config({
                debug:true,
                events:true
            });

            //默认以及出现异常情况时跳转至登陆界面
            $urlRouterProvider.otherwise("/authorize/login");
            
            //加载所有路由配置信息
            angular.forEach(allRouter,(routeConfig) => {
                $stateProvider.state(routeConfig.state,routeConfig.config);
            });

            //设置国际化语言转换
            // console.log($translateProvider);
            $translateProvider.translations('en-US',enUS)
                              .translations('zh-CN',zhCN)
                              .fallbackLanguage('zh-CN'); //注册语言并设置没有加载到语言时的默认语言
            $translateProvider.preferredLanguage('zh-CN'); //设置系统默认语言，此处默认语言中文

            //获取缓存中的语言
            let language = sessionStorage.getItem('LANGUAGE');
            if(!language){
                sessionStorage.setItem('LANGUAGE','zh-CN');
            }
            

            // 允许跨域调用Web API
            $httpProvider.defaults.withCredentials = true;

            //注册依赖 请求拦截器
            $httpProvider.interceptors.push('interceptorService');

            //弹窗锁屏配置
            blockUIConfig.message = '请稍等，让数据飞一会儿...';

            //tree默认配置
            treeConfig.defaultCollapsed = true; //默认不展开 
        }
    ]);
}