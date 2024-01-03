$(document).ready(() =>{

	/*************************************************************************/
	/* Web socket events *****************************************************/
	const socket = io();
	socket.on('update', function(data){
		console.log("data")
	});

	const charBuffer = []
	const process_keycode = (event)=>{
		if (event.key === 'Backspace')
		{
			$("#message").val(charBuffer.pop());
			$("#title").html(charBuffer.pop())
		}
		else {
		charBuffer.push(event.key);
		$("#message").val(charBuffer.join(''));
		$("#title").html(charBuffer.join(''));
		}
	}



	$("#message").keydown((event) => {
		event.preventDefault();
		if(	event.keyCode === 32 
			|| (event.keyCode >= 48 && event.keyCode <= 126) || (event.keyCode >=186 && event.keyCode <=191)
			|| event.keyCode ==8)
			{
			process_keycode(event);		
		}

	});

	$("#send-message").on('click', (event)=>{
		event.preventDefault();
		const message = $("#message").val();     
		$("#message").val('');
		socket.emit('chat message', message);
		alert(`The message is: ${message}`);
	});

	$('#live-chat header').on('click', () =>{
		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');
	});

	$('.chat-close').on('click', (e) =>{
		e.preventDefault();
		$('#live-chat').fadeOut(300);
	});

}) 