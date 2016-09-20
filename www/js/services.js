'use strict';

angular.module('starter.services', [])

.factory('Alarms', function($interval,$filter,Alarmer,$rootScope) {
  // Might use a resource here that returns a JSON array

  var chats = [];
  $interval(function(){

    var now = Date.now();

    angular.forEach(chats, function(value, key) {

      //if this alarm is already active...
      if(value.active === 1){

        console.log('It sound in '+ Math.abs($filter('number')((now - value.date)/1000, 0)) +' seconds');

        if( now > value.date){
          value.active = 0;
          Alarmer.drin(value);
        }

      }

    });

  }, 1000, 0, true);

  /* ES: {
  "name":"a",
  "text":"a",
  "date":1444499040000,
  "snoozeTime":5000,
  "active":0,
  "id":1}
  */

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    addnew: function (chat){

      var lenght = chats.length;

      var id = 0;

      for (var i = 0; i < lenght; i++) {
        if (chats[i].id > id) {
          id = chats[i].id;
        }
      }


      chat.active = 1;
      chat.id = (id + 1);

      var pushedLenght =  chats.push(chat);

      if(pushedLenght > length){
        return true
      }else{
        return false
      }
    },
    snooze:function(chatId,snoozeTime){

      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {

          chats[i].active = 1;
          chats[i].date = Date.now() + snoozeTime;
          console.log(chats);
          return true;

        }
      }
      return null;


    }
  };


})

.service('Alarmer',function($rootScope){

  var drin = function(alarm){
    $rootScope.$broadcast('alarm:show',alarm);
  };

  return {
    drin:drin
  };


});
