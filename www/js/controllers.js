angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HaritaCtrl', function($scope,$cordovaGeolocation,$ionicPlatform,islemler) {
    $ionicPlatform.ready(function() {
      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        //pozisyon degeri gelince  yapılacaklar
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //HARİTAYA MARKER EKLEME
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng
            });
            var infoWindow = new google.maps.InfoWindow({
                content: "Şuan Burdasın..."
            });
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open($scope.map, marker);
            });
          });//google.maps.event.addListenerOnce($scope.map, 'idle', function(){
        //////ETRAFIMDAKİ CAFELERİ GETİRME
        $scope.cafeleriGetir=function(){
          var Promise=islemler.yakinYerler(position.coords.latitude, position.coords.longitude);
          console.info(Promise);
          for(cafe in Promise)
          {
            console.log(cafe);
          }
          //console.info(yerler);
          //HARİTAYA MARKER EKLEME
          /*
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){
              //yerlerin eleman sayısı kadar maker ekleyeceğim....
              var marker = new google.maps.Marker({
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  position: latLng
              });
              var infoWindow = new google.maps.InfoWindow({
                  content: "Şuan Burdasın..."
              });
              google.maps.event.addListener(marker, 'click', function () {
                  infoWindow.open($scope.map, marker);
              });

            });//google.maps.event.addListenerOnce($scope.map, 'idle', function(){
            */
        }
        ////////////////
      }, function(error){
        //pozisyon degeri gelmeyince yapılacaklar
        alert(JSON.stringify(error));
      });

    });//$ionicPlatform.ready(function() {})

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('AnamenuCtrl', function($scope) {
  $scope.sayfalar=[
    {'baslik':'MENU1','resim':'img/bg1.jpg','baglanti':'app.harita'},
    {'baslik':'MENU2','resim':'img/bg2.jpg','baglanti':'app.browse'},
    {'baslik':'MENU3','resim':'img/bg3.jpg','baglanti':'app.seacrh'},
    {'baslik':'MENU4','resim':'img/bg4.jpg','baglanti':'app.kategori'}
  ];
})
.controller('KategoriCtrl', function($scope) {
});
