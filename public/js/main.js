const charBuffer = [];

$(document).ready(() =>{

	/*************************************************************************/
	/* Web socket events *****************************************************/

	const socket = io();
	socket.on('update', function(data){
		console.log("data")
	});
	/*************************************************************************/
	/* login form ************************************************************/

	const $loginForm = $("#form-signin");
	$(".form-container").removeClass("off-canvas");
	$('#live-chat').fadeOut(300);		
	$('#form-signin').submit((event) => {
        event.preventDefault(); 
        alert('Form submitted!');
    });
	/*************************************************************************/
	/* chat user *************************************************************/

	const updateUserMessages = () => {
		const message = charBuffer.join('');
		$("#message").val(charBuffer.join(''));
		$("#title").html(charBuffer.join(''));
	}

	const process_keycode = (event)=>{
		if (event.key === 'Backspace') { 
			const lastChar = charBuffer.pop(); 
		} else { 
			charBuffer.push(event.key);
		}
		updateUserMessages();
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
		socket.emit('chat message', charBuffer.join(''));
		charBuffer.length = 0;
		updateUserMessages();
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