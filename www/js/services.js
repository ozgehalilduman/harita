/* global angular, document, window */
'use strict';
angular.module('starter.services', [])
.factory("islemler",function($http,$ionicLoading){
  var yerler=[];
  return{
    yakinYerler:function(lat,lng)
    {
       //var $promise=$http.get('https://maps.googleapis.com/maps/api/place/search/json?types=cafe&location='+lat+','+lng+'&radius=5000&sensor=false&key=AIzaSyDJJcH5P2Z-nD3NA5R767GH03cYeUD3Qsw');
       var $promise=$http.get('data/konum.json');
       return $promise.then(function(msg){
            yerler=msg.data.results;
            return yerler;
        });//promise kısmının
    }//giris kontrol
  }//return
});//factory
