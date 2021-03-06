/**
 * 导航栏目选中、弹窗拖拽、
 * xiaohao
 */


//导航栏选中
let MenuHrefActive = $timeout => {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var activeMatchObj = JSON.parse(attrs['menuHrefActive']), //节点对象
                activeMatch = activeMatchObj.uiRouter, //节点路由匹配规则
                activeCls = '',
                scope = $scope;

            if (activeMatchObj.level === 1) { //一级导航
                activeCls = 'parent-active';
            } else if (activeMatchObj.level === 2) { //二级导航
                activeCls = 'node-child-active';
            } else if (activeMatchObj.level === 3) { //三级导航
                activeCls = 'child-active';
            }

            if (activeMatch) {
                update(activeMatch);
                scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    update(activeMatch);
                });
            }

            function addClass() {
                $timeout(function() {
                    var $element = $(element);
                    !$element.hasClass(activeCls) && $element.addClass(activeCls);
                }, 0, false);
            }

            function removeClass() {
                $timeout(function() {
                    var $element = $(element);
                    $element.hasClass(activeCls) && $element.removeClass(activeCls);
                }, 0, false);
            }

            function update(_activeMatch) {
                var isActive = scope.$state.includes(_activeMatch);
                if (isActive) {
                    addClass();
                } else {
                    removeClass();
                }
            }

        }
    }
}

MenuHrefActive.$inject = ['$timeout'];

//弹窗拖拽
let DragModal = ($timeout) => {
    return {
        restrict:'A',
        link:function(scope,ele,attr){
            $(ele).parent().draggable({
                cancel: ".dryad-drag-disabled",
                cursor: "move",
                containment:'.modal'
            });
        }
    }
};
DragModal.$inject = ['$timeout'];





module.exports = appModule => {
    appModule.directive('menuActive',MenuHrefActive);
    appModule.directive('dragModal', DragModal);
};