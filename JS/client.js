//client-side
const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('../Assets/Ting.mp3');

const button = document.querySelector('button');

//gives a message when someones join like:(Ayan is join the chat)
const append = (message, position, join) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    //join member
    if(join)messageElement.classList.add('message-join');

    else{
        //adding styles to the div
        messageElement.classList.add('message');
        //giving position left or right
        messageElement.classList.add(position);
    }
   
    //append our broadcast to message container that we make 
    messageContainer.append(messageElement);
    if(position === 'left'){
        audio.play();
    }
}
// send message event(if someones send message)
button.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("clicked");
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    //to clear the message input after sending the message
    messageInput.value = '';
});
//on using enter kry-->
window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log("enter pressed");
        e.preventDefault();
        const message = messageInput.value;
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        //to clear the message input after sending the message
        messageInput.value = '';
    }
});


//telling server who's joinning 
const name =  prompt("Enter your name to join:");
// emitting event to join as a new user
socket.emit('new-user-joined', name);


// lisnining node-server user-joined event & assigning tasks 
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right', true)
    console.log(name);
});
//listning when somone hit send button
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
});

//listning disconnect event
socket.on('leave', name =>{
    append(`${name} left the chat`, 'left', true)
});
