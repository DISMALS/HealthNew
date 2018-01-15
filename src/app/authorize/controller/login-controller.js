class LoginCtrl{
    constructor($rootScope,$cookies,$scope, $state,toastr,APP_CONFIG,$timeout,$translate){
        console.log('这是登陆输入框内容：',$scope);
        $scope.goto = () => {
            $state.go('authorize.chooiseorg');
            $translate.use('en-US');
            sessionStorage.setItem('LANGUAGE','en-US');
        }
    }
}

LoginCtrl.$inject = ['$rootScope','$cookies','$scope', '$state','toastr','APP_CONFIG','$timeout','$translate'];


module.exports = (appModule) => {
    appModule.controller('loginCtrl',LoginCtrl);
};