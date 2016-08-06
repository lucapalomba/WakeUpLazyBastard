// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$ionicModal) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $rootScope,
      animation: 'slide-in-left',
      focusFirstInput: true
    })
    .then(function(modal) {
      $rootScope.modal = modal;
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.hello', {
    url: '/hello',
    views: {
      'tab-hello': {
        templateUrl: 'templates/tab-hello.html',
        controller: 'HelloCtrl'
      }
    }
  })

  .state('tab.alarms', {
    url: '/alarms',
    views: {
      'tab-alarms': {
        templateUrl: 'templates/tab-alarms.html',
        controller: 'AlarmsCtrl'
      }
    }
  })

  .state('tab.alarms-detail', {
    url: '/alarms/:alarmId',
    views: {
      'tab-alarms': {
        templateUrl: 'templates/tab-alarms-detail.html',
        controller: 'AlarmsDetailCtrl'
      }
    }
  })

  .state('tab.alarms-new', {
    url: '/newalarm',
    views: {
      'tab-alarms': {
        templateUrl: 'templates/tab-alarms-new.html',
        controller: 'AlarmsNewCtrl'
      }
    }
  })


  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/hello');

});
