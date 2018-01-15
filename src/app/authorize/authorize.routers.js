module.exports = (appModule) => {
    return [
        {
            state:'authorize',
            config:{
                abstract: true,
                url: '/authorize',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/authorize.html'], require => {
                        const template = require('./html/authorize.html');
                        deferred.resolve(template);
                    }, './authorize/authorize-tpl');
                    return deferred.promise;
                }
            }
        },
        {
            state:'authorize.login',
            config:{
                url: '/login',
                templateProvider: ($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/login.html'], require => {
                        const template = require('./html/login.html');
                        deferred.resolve(template);
                    }, './authorize/login-tpl');
                    return deferred.promise;
                },
                controller: 'loginCtrl',
                controllerAs: 'loginvm',
                resolve: {
                    'load': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/login-controller.js'], (require) => {
                            const ctrl = require('./controller/login-controller.js')(appModule);
                            
                            deferred.resolve(ctrl);
                        }, './authorize/login-ctrl');
                        return deferred.promise;
                    }
                }
            }
        },
        {
            state:'authorize.chooiseorg',
            config:{
                url:'/chooiseOrg',
                templateProvider:($q) => {
                    const deferred = $q.defer();
                    require.ensure(['./html/chooise-org.html'],require => {
                        let tpl = require('./html/chooise-org.html');
                        deferred.resolve(tpl);
                    },'./authorize/chooise-org-tpl');
                    return deferred.promise;
                },
                controller: 'chooiseOrgCtrl',
                controllerAs: 'chooiseOrgvm',
                resolve: {
                    'load': ($q, $ocLazyLoad) => {
                        const deferred = $q.defer();
                        require.ensure(['./controller/chooise-org.controller.js'], (require) => {
                            const ctrl = require('./controller/chooise-org.controller.js')(appModule);
                            
                            deferred.resolve(ctrl);
                        }, './authorize/chooise-org-ctrl');
                        return deferred.promise;
                    }
                }
            }
        }
    ]
}