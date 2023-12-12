$(document).ready(() =>{

	const socket = io();
	socket.on('update', function(data){
		console.log("data")
	});


	$("#send-message").on('click', (event)=>{
		event.preventDefault();
		const message = $("#message").val();     
		$("#message").val('');
		alert(`The message is: ${message}`);
	});

	$('#live-chat header').on('click', function() {

		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');

	});


	$('.chat-close').on('click', function(e) {

		e.preventDefault();
		$('#live-chat').fadeOut(300);

	});

}) ();