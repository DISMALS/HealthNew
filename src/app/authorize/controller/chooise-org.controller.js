class ChooiseOrg{
    constructor($rootScope,$scope,$state){
        console.log('这是选择机构界面：',$scope);
        $scope.goto = () => {
            $state.go('authorize.login');
        }
    }
}

ChooiseOrg.$inject = ['$rootScope','$scope','$state'];

module.exports = appModule => {
    appModule.controller('chooiseOrgCtrl',ChooiseOrg);
}