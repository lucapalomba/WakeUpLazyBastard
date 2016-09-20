'use strict';

angular.module('starter.controllers', [])

.controller('HelloCtrl', function() {})

.controller('AlarmsCtrl', function($scope, Alarms) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  //Get all Alarms
  $scope.alarms = Alarms.all();

})

.controller('AlarmsNewCtrl', function($scope, Alarms,$state,$filter) {

  $scope.alarm = {};

  $scope.minDatetimeLocal = Date.now() + 60000;

  $scope.time = {snoozeTime: 5000,ringDate: new Date($filter('date')(Date.now() + 60000, 'short'))};

  $scope.save = function(){

    //TODO checking data
    var date = new Date($scope.time.ringDate);

    $scope.alarm.date = date.getTime();
    $scope.alarm.snoozeTime = $scope.time.snoozeTime;
    var done = Alarms.addnew($scope.alarm);

    if(done){
      $state.go('tab.alarms');
    }

  };




})

.controller('AlarmsDetailCtrl', function($scope,Alarms,$stateParams,$filter) {

  $scope.alarmdetail = {};

  $scope.alarmdetail.isDisabled = true;
  $scope.alarmdetail.alarm = Alarms.get($stateParams.alarmId);
  $scope.alarmdetail.alarm.date = new Date($filter('date')( $scope.alarmdetail.alarm.date, 'short'));
  console.log($scope.alarmdetail.alarm);

})

//controller for modal.
.controller('ModalCtrl', function($scope,$rootScope,Alarmer,$ionicModal,Alarms) {

  $scope.alarm = {};

  //register music
  var isWebView = ionic.Platform.isWebView();
  if(isWebView){
    var myMedia = new Media('/android_asset/www/music/pop.mp3',null,null);
  }

  $scope.hideModal = function() {
    $rootScope.modal.hide();
    if(isWebView){myMedia.stop(); }
  };

  $scope.snoozeModal = function (alarmId,snoozeTime){
    Alarms.snooze(alarmId,snoozeTime);
    $rootScope.modal.hide();
    if(isWebView){myMedia.stop(); }
  };

  $rootScope.$on('alarm:show', function(e,m) {
    $rootScope.modal.show();
    $scope.alarm.dataAlarm = m;
    if(isWebView){myMedia.play(); }
  });

  $rootScope.$on('alarm:show', function() {});

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    remote: false
  };
});
