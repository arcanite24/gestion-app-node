$(function () {
  var room = window.location.search.replace('?room=', '');
  var rtcOpts = {
      room: room,
      signaller: 'http://localhost:3000'
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
});
