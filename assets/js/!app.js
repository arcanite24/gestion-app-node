var app = angular.module('gestionApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngFlowGrid', 'gridster']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/index");
  $stateProvider
    .state('index', {url: '/index', templateUrl: 'templates/index.html', controller: 'WeaCtrl'})
    .state('users', {url: '/users', templateUrl: 'templates/users.html', controller: 'UsersCtrl'})
    .state('login', {url: '/login', templateUrl: 'templates/login.html', controller: 'LoginCtrl'})
    //Gestion Users
    .state('getusers', {url: '/getusers', templateUrl: 'templates/getusers.html', controller: 'GetUsersCtrl'})
    .state('addteacher', {url: '/addteacher', templateUrl: 'templates/addteacher.html', controller: 'AddTeacherCtrl'})
    .state('addalumno', {url: '/addalumno', templateUrl: 'templates/addalumno.html', controller: 'AddAlumnoCtrl'})
    .state('addadmin', {url: '/addadmin', templateUrl: 'templates/addadmin.html', controller: 'AddAdminCtrl'})
    .state('adddato', {url: '/adddato', templateUrl: 'templates/adddato.html', controller: 'AddDatoCtrl'})
    .state('getdatos', {url: '/getdatos', templateUrl: 'templates/getdatos.html', controller: 'GetDatosCtrl'})
    //Grupos
    .state('grupos', {url: '/grupos', templateUrl: 'templates/grupos.html', controller: 'GruposCtrl'})
    .state('getgrupos', {url: '/getgrupos', templateUrl: 'templates/getgrupos.html', controller: 'GetGruposCtrl'})
    .state('addgrupos', {url: '/addgrupos', templateUrl: 'templates/addgrupos.html', controller: 'AddGruposCtrl'})
    .state('setgrupo', {url: '/setgrupo', templateUrl: 'templates/setgrupo.html', controller: 'SetGrupoCtrl'})
    .state('setprofegrupo', {url: '/setprofegrupo', templateUrl: 'templates/setprofegrupo.html', controller: 'SetProfeGrupoCtrl'})
    .state('delprofe', {url: '/delprofe', templateUrl: 'templates/delprofe.html', controller: 'DelProfeCtrl'})
    //Horarios
    .state('horarios', {url: '/horarios', templateUrl: 'templates/horarios.html', controller: 'HorariosCtrl'})
    .state('addclase', {url: '/addclase', templateUrl: 'templates/addclase.html', controller: 'AddClaseCtrl'})
    .state('getclases', {url: '/getclases', templateUrl: 'templates/getclases.html', controller: 'GetClasesCtrl'})
    .state('addhorario', {url: '/addhorario', templateUrl: 'templates/addhorario.html', controller: 'AddHorarioCtrl'})
    .state('setmaterias', {url: '/setmaterias', templateUrl: 'templates/setmaterias.html', controller: 'SetMateriasCtrl'})
    .state('gethorarios', {url: '/gethorarios', templateUrl: 'templates/gethorarios.html', controller: 'GetHorariosCtrl'})
    .state('delclase', {url: '/delclase', templateUrl: 'templates/delclase.html', controller: 'DelClaseCtrl'})
    //Clases online
    .state('joinclase', {url: '/joinclase', templateUrl: 'templates/joinclase.html', controller: 'JoinClaseCtrl'})
    .state('startclase', {url: '/startclase', templateUrl: 'templates/startclase.html', controller: 'StartClaseCtrl'})
    .state('watchclase', {url: '/watchclase/:room', templateUrl: 'templates/watchclase.html', controller: 'WatchClaseCtrl'})
    .state('clases', {url: '/clases', templateUrl: 'templates/clases.html', controller: 'ClasesCtrl'})
    .state('notas', {url: '/notas', templateUrl: 'templates/notas.html', controller: 'NotasCtrl'})
    //Examenes
    .state('examenes', {url: '/examenes', templateUrl: 'templates/examenes.html', controller: 'ExamenesCtrl'})
    .state('addexamen', {url: '/addexamen', templateUrl: 'templates/addexamen.html', controller: 'AddExamenCtrl'})
    .state('getexamen', {url: '/getexamen', templateUrl: 'templates/getexamen.html', controller: 'GetExamenCtrl'})
    .state('calendarioexamenes', {url: '/calendarioexamenes', templateUrl: 'templates/calendarioexamenes.html', controller: 'CalendarioExamenesCtrl'})
    //Anuncios
    .state('anuncios', {url: '/anuncios', templateUrl: 'templates/anuncios.html', controller: 'AnunciosCtrl'})
    .state('addanuncio', {url: '/addanuncio', templateUrl: 'templates/addanuncio.html', controller: 'AddAnuncioCtrl'})
    .state('getanuncio', {url: '/getanuncio', templateUrl: 'templates/getanuncio.html', controller: 'GetAnuncioCtrl'})
    .state('watchanuncio', {url: '/watchanuncio', templateUrl: 'templates/watchanuncio.html', controller: 'WatchAnuncioCtrl'})
    //Tareas
    .state('tareas', {url: '/tareas', templateUrl: 'templates/tareas.html', controller: 'TareasCtrl'})
    .state('addtarea', {url: '/addtarea', templateUrl: 'templates/addtarea.html', controller: 'AddTareaCtrl'})
    .state('gettarea', {url: '/gettarea', templateUrl: 'templates/gettarea.html', controller: 'GetTareaCtrl'})
    .state('calendariotareas', {url: '/calendariotareas', templateUrl: 'templates/calendariotareas.html', controller: 'CalendarioTareasCtrl'})
    //Test
    .state('test', {url: '/test', templateUrl: 'templates/test.html', controller: 'TestCtrl'})
    //calificaciones
    .state('calificaciones', {url: '/calificaciones', templateUrl: 'templates/calificaciones.html', controller: 'CalificacionesCtrl'})
    .state('addcalificacion', {url: '/addcalificacion', templateUrl: 'templates/addcalificacion.html', controller: 'AddCalificacionCtrl'})
    .state('getcalificacion', {url: '/getcalificacion', templateUrl: 'templates/getcalificacion.html', controller: 'GetCalificacionCtrl'})
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
