$(document).ready(() => {
  const socket = io();
  let currentUserId = null;

  const appendMessage = (message) => {
    const messageDate = new Date(message.timestamp);
    const timeText = Number.isNaN(messageDate.getTime())
      ? ''
      : messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isOwnMessage = currentUserId && message.userId === currentUserId;
    const ownMessageClass = isOwnMessage ? ' own-message' : '';

    $('#chat-history').append(`
      <div class="chat-message clearfix${ownMessageClass}">
        <div class="chat-message-content">
          <span class="chat-time">${timeText}</span>
          <h5>${message.userId}</h5>
          <p>${message.text}</p>
        </div>
      </div>
      <hr>
    `);

    const chatHistory = document.getElementById('chat-history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
  };

  $('#chat-form').on('submit', (event) => {
    event.preventDefault();
    const text = $('#message').val().toString();

    if (!text.trim()) {
      return;
    }

    socket.emit('chat message', text);
    $('#message').val('');
  });

  socket.on('chat message', (message) => {
    appendMessage(message);
  });

  socket.on('user_id', (data) => {
    currentUserId = data.user_id;
  });

  $('#maximize-window').on('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Unable to toggle fullscreen mode', error);
    }
  });

  $('#open-home-window').on('click', () => {
    window.open(
      '/',
      'furrymalsHomeWindow',
      'width=960,height=700,left=120,top=80,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes,scrollbars=yes'
    );
  });

  $('#live-chat header').on('click', () => {
    $('.chat').slideToggle(300, 'swing');
  });

  $('.chat-close').on('click', (event) => {
    event.preventDefault();
    $('#live-chat').fadeOut(300);
  });
});
