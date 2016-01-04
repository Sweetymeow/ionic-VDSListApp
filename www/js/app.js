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
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  }) // parent
  .state('tabs.home', { // child template
    url: '/home',
    views: {
      'home-tabs':{ // keep the same with <ion-tabs><ion-tab><ion-nav-view name="list-tabs"> in tabs.html
        templateUrl: 'templates/home.html'
      }
    }
  })
  .state('tabs.calendar', { // child template
    url: '/calendar',
    views: {
      'calendar-tabs':{
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarController'
      }
    }
  }) // child - home
  .state('tabs.brandlist', { // child template
    url: '/brandlist',
    views: {
      'brandlist-tabs':{ // keep the same with <ion-tabs><ion-tab><ion-nav-view name="list-tabs"> in tabs.html
        templateUrl: 'templates/brandlist.html',
        controller: 'AutoListController'
      }
    }
  })
  .state('tabs.modellist', { // child template
    url: '/brandlist/:brandIndex',
    views: {
      'brandlist-tabs':{ // keep the same with <ion-tabs><ion-tab><ion-nav-view name="list-tabs"> in tabs.html
        templateUrl: 'templates/modellist.html',
        controller: 'AutoListController'
      }
    }
  }) // child - list page
  .state('tabs.detail', { // child template
    url: '/brandlist/:aId',
    views: {
      'brandlist-tabs':{ // keep the same with <ion-tabs><ion-tab><ion-nav-view name="list-tabs"> in tabs.html
        templateUrl: 'templates/detail.html',
        controller: 'AutoListController'
      }
    }
  }) // children of list page

  $urlRouterProvider.otherwise('/tab/home');
})
.controller('CalendarController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  $http.get('js/research_cal.json').success(function(data){
    $scope.calendar = data.calendar;

    $scope.onItemDelete = function(dayIndex, item){
      console.log($scope.calendar);
      $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1); 
    }; 
    $scope.deleteItem = function(item){
      console.log("Index of item: " + $scope.cardeplists.indexOf(item));
      $scope.calendar.splice($scope.cardeplists.indexOf(item), 1); 
      data.showRecorder = !data.showRecorder;
    }; // deleteItem()

    $scope.toggleStar = function(item){
      console.log(item.star);
      item.star = !item.star; // use for ng-show 
    };

    $scope.doRefresh = function(){
      $http.get('js/research_cal.json')
        .success(function(data){
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        }); // reload all data
    }
  })
}])
.controller('AutoListController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  $http.get('js/VDSbyModel.json').success(function(data){
  	console.log($stateParams);
    $scope.carbrandlist = data;
    $scope.whichbrand = $stateParams.brandIndex;
    console.log($scope.whichbrand);
	console.log($scope.carbrandlist);
    $scope.whichcar = $stateParams.aId;

    $scope.data = {showDelete: false, showRecorder: false};

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
.controller('ListController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  $http.get('js/research_cal.json').success(function(data){
    $scope.cardeplists = data.cars;

    $scope.whichcar = $stateParams.aId;

    $scope.data = {showDelete: false, showRecorder: false};

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