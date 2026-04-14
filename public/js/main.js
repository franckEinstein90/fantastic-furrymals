$(document).ready(() => {
  const socket = io();

  const appendMessage = (message) => {
    const messageDate = new Date(message.timestamp);
    const timeText = Number.isNaN(messageDate.getTime())
      ? ''
      : messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    $('#chat-history').append(`
      <div class="chat-message clearfix">
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

  $('#live-chat header').on('click', () => {
    $('.chat').slideToggle(300, 'swing');
  });

  $('.chat-close').on('click', (event) => {
    event.preventDefault();
    $('#live-chat').fadeOut(300);
  });
});
