class RootCtrl{
    constructor($rootScope,$scope){
        console.log($rootScope);
        console.log($scope);
    }
}

RootCtrl.$inject = ['$rootScope','$scope'];

module.exports = appModule => {
    appModule.controller('rootCtrl',RootCtrl);
}