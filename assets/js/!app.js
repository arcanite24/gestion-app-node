var app = angular.module('gestionApp', ['ui.router', 'ngMaterial', 'ngMdIcons']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/index");
  $stateProvider
    .state('index', {url: '/index', templateUrl: 'templates/index.html', controller: 'WeaCtrl'})
    .state('users', {url: '/users', templateUrl: 'templates/users.html', controller: 'UsersCtrl'})
    .state('login', {url: '/login', templateUrl: 'templates/login.html', controller: 'LoginCtrl'})
    //Gestion Users
    .state('addteacher', {url: '/addteacher', templateUrl: 'templates/addteacher.html', controller: 'AddTeacherCtrl'})
    .state('addalumno', {url: '/addalumno', templateUrl: 'templates/addalumno.html', controller: 'AddAlumnoCtrl'})

    //Test
    .state('test', {url: '/test', templateUrl: 'templates/test.html', controller: 'TestCtrl'})

    //Real-time
    .state('realtime', {url: '/realtime', templateUrl: 'templates/realtime.html', controller: 'RealTimeCtrl'})
});

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.definePalette('poliPallete', {
    '50': 'ffebee',
    '100': 'ffcdd2',
    '200': 'ef9a9a',
    '300': 'e57373',
    '400': 'ef5350',
    '500': 'f44336',
    '600': 'e53935',
    '700': 'd32f2f',
    '800': 'c62828',
    '900': '800003',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100',
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined
  });
  $mdThemingProvider.theme('default')
  .primaryPalette('poliPallete', {
    'default': '900'
  });
});
