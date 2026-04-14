const charBuffer = [];

const KEYCODES = {
	BACKSPACE: 8,
	SPACE: 32,
	DIGIT_0: 48,
	TILDE: 126,
	SEMICOLON: 186,
	FORWARD_SLASH: 191,
};

$(document).ready(() =>{

	/*************************************************************************/
	/* Web socket events *****************************************************/
	const socket = io();
	socket.on('update', function(data){
		console.log("data")
	});

	const updateUserMessages = ()=>{
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
		if(	event.keyCode === KEYCODES.SPACE 
			|| (event.keyCode >= KEYCODES.DIGIT_0 && event.keyCode <= KEYCODES.TILDE)
			|| (event.keyCode >= KEYCODES.SEMICOLON && event.keyCode <= KEYCODES.FORWARD_SLASH)
			|| event.keyCode === KEYCODES.BACKSPACE)
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