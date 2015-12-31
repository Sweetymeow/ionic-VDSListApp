// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('ListController', ['$scope', '$http', function($scope, $http){
  $http.get('js/JDPower_research.json').success(function(data){
    $scope.cardeplists = data;

    $scope.moveItem = function(item, fromIndex, toIndex){
          //  remove select item from $scope.cardeplists
          $scope.cardeplists.splice(fromIndex, 1); 
          $scope.cardeplists.splice(toIndex, 0, item); // add the item back to $scope.cardeplists
      // arrayObject.splice(index,howmany,item1,.....,itemX)
      // index 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
      // howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
      // item1, ..., itemX 可选。向数组添加的新项目。
      }; // moveItem()
      $scope.deleteItem = function(item){
          console.log("Index of item: " + $scope.cardeplists.indexOf(item));
          $scope.cardeplists.splice($scope.cardeplists.indexOf(item), 1); 
          data.showRecorder = !data.showRecorder;
      }; // deleteItem()

      $scope.toggleStar = function(item){
          console.log(item.star);
          item.star = !item.star; // use for ng-show 
      };

      $scope.doRefresh = function(){
        $http.get('js/JDPower_research.json')
            .success(function(data){
              $scope.cardeplists = data;
              $scope.$broadcast('scroll.refreshComplete');
            }); // reload all data
      }
      // $scope.onSwipeLeft = function(){
      //   console.log("onSwipeLeft()");
      // }
  })
}])
.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});
// Solution find in http://jsfiddle.net/sweetymeow/qca3a62b/
// http://stackoverflow.com/questions/16349578/angular-directive-for-a-fallback-image

var setDefaultImage = function (el) {
    console.log("Call brokeUrl" + el.attr());
    el.attr('src', "img/car_holder.png");
};// can't find by <img onerror="setDefaultImage(this)"> in index.html