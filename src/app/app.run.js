module.exports = appModule => {
    appModule.run([
        '$rootScope', 
        '$state', 
        '$stateParams', 
        '$timeout', 
        '$cookies', 
        '$templateCache',
        '$translate',
        ($rootScope, $state, $stateParams, $timeout, $cookies, $templateCache,$translate) => {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //禁用浏览器后退按钮
            $rootScope.$on('$locationChangeStart', function(event, from, to) {
                var st = angular.copy($state.current);
                var stateHref = $state.href(st.name, $stateParams);
                var isPageHistoryBack = st.url != '^' && -1 == from.indexOf(stateHref);
                if (isPageHistoryBack) {
                    event.preventDefault();
                }
            });


            //路由相关变化
            $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {  
                console.log('变化开始！');
                
                //获取缓存中的语言格式如果没有则设置成中文
                $translate.use(sessionStorage.getItem('LANGUAGE') || 'zh-CN');
            });
            $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
                console.log('变化出错了！');
            });
            $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
                console.log('变化结束了！');
            });
        }
    ]);
};