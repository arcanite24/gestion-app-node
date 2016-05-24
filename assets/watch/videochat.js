$(function () {

  function addLocalMsg(text, user) {
    var finaltext = text.replace('/', '').replace('>', '').replace('<', '');
    var str = '<div class="msg col s9 right animated fadeIn" style="margin-right: 1em;"><div class="card"><div class="card-content right-align">'+finaltext+'<strong> :'+user+'</strong></div></div></div>';
    $(str).appendTo('.chat-msg');
  }
  function addRemoteMsg(text, user) {
    var finaltext = text.replace('/', '').replace('>', '').replace('<', '');
    var str = '<div class="msg col s9 animated fadeIn" style="margin-left: 1em;"><div class="card"><div class="card-content"><strong>'+user+':</strong> '+finaltext+'</div></div></div>';
    $(str).appendTo('.chat-msg');
  }

  var room = window.location.search.replace('?room=', '');
  io.socket.get('/mensaje', function (data) {
    var mensajes = data;
  });

  $('.modal-trigger').leanModal();

  $('.forma').submit(function (e) {
    e.preventDefault();
    var tempMsg = {
      message: $('.msg-input').val(),
      room: room,
      username: localStorage.getItem('username')
    };

    if (tempMsg.message != null) {
      io.socket.post('/mensaje/create', tempMsg, function (data) {
        $('.msg-input').val('');
      });
    }

  });

  $('#addNote').click(function () {
    var notaTemp = {
      titulo: $('#titulo_nota').val(),
      texto: $('#texto_nota').val(),
      user: localStorage.getItem('iduser')
    };
    var xy = Math.random() < 0.5;
    var largo = notaTemp.texto.length / 100;
    if (largo < 1)
      largo = 1;
    if (xy) {
      notaTemp.sizeX = Math.floor(largo);
      notaTemp.sizeY = 1;
    } else {
      notaTemp.sizeX = 1;
      notaTemp.sizeY = Math.floor(largo);
    }
    io.socket.post('/nota', notaTemp, function(data) {
      if (!data.error) {
        Materialize.toast('Nota agregada correctamente.', 1000);
        $('#titulo_nota').val('')
        $('#texto_nota').val('')
      } else {
        Materialize.toast('Error.', 1000);
        console.log(data);
      }
    });
  });

  io.socket.on('mensaje', function onServerSentEvent (msg) {
    switch(msg.verb) {
      case 'created':
        if (msg.data.room == room) {
          if (msg.data.username == localStorage.getItem('username')) {
            console.log('Mensaje local.');
            addLocalMsg(msg.data.message, 'Yo');
          } else {
            console.log('Mensaje remoto.');
            addRemoteMsg(msg.data.message, msg.data.username);
          }
          var alto = $('.chat-msg').height();
          console.log('Alto: ' + alto);
          $("div").scrollTop(alto);
        }
        break;
      default:
        console.log('Error con los sockets.');
        break; // ignore any unrecognized messages
    }
  });

});



//Videochat
var room = window.location.search.replace('?room=', '');
var rtcOpts = {
    room: room,
    signaller: 'http://192.168.5.167:3000'
  };
var rtc = RTC(rtcOpts);
var localVideo = document.getElementById('l-video');
var remoteVideo = document.getElementById('r-video');
var messageWindow = document.getElementById('messages');

function bindDataChannelEvents(id, channel, attributes, connection) {

  channel.onmessage = function (evt) {
    messageWindow.innerHTML = evt.data;
  };

  messageWindow.onkeyup = function () {
    channel.send(this.innerHTML);
  };
}

function init(session) {
  session.createDataChannel('chat');
  session.on('channel:opened:chat', bindDataChannelEvents);
  console.log(session);
}

localVideo.appendChild(rtc.local);
remoteVideo.appendChild(rtc.remote);
rtc.on('ready', init);
