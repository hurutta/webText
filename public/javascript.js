// ./public/javascript.js

// Get the current username from the cookies
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('তোমার নাম : ');					//alert er moto box ashbe
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    // Store it in the cookies for future use
    cookie.set('user', user);
	//var socket2 = io();
  	//socket2.emit('message', { user: cookie.get('user') || 'Anonymous', message: 'aise' });
	//socket2.emit('welcomeMessage', { user: cookie.get('user') || 'Anonymous' });
  }
}

  
//var socket2 = io();
var socket = io();
socket.emit('message', { user: cookie.get('user') || 'Anonymous', message: 'aise' });

socket.on("disconnect", () => {
  $('.chatbox').append('<h6> miao mioa <strong>' + data.user + '</strong> wefwef করেছেন </h6>');
  window.alert(123);
});



// The user count. Can change when someone joins/leaves
socket.on('count', function (data) {
  $('.user-count').html('<strong>অনলাইনে আছে </strong>'+data+'<strong> জন&nbsp;</strong>');		//data - koyjon user ache tar int
});



// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function (data) 
{

	//msj pathanor time convert am/pm
	var date= new Date();
	var hours = date.getHours();
  	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
 	hours = hours % 12;
  	hours = hours ? hours : 12; // the hour '0' should be '12'
 	minutes = minutes < 10 ? '0'+minutes : minutes;
 	var strTime = hours + ':' + minutes + ' ' + ampm;



	if(data.message=='aise')
	{
  		$('.chatbox').append('<h6> এইমাত্র <strong>' + data.user + '</strong> ওয়েবটেক্সটে জয়েন করেছেন </h6>');
	}else
	{
  		$('.chatbox').append('<p><strong>' + data.user + '</strong>: ' + data.message + ' <d1 style="text-align:right;color:gray;font-size: 10px;">' + strTime +'</d1></p>');
	}

  if(data.user!=user)
  {
    var beepsound = new Audio('https://www.soundjay.com/buttons/sounds/button-42.mp3'); 
    beepsound.play(); 
  }


  	var elem = document.getElementById("cha");		//auto matic scroll korbe eta diye, scroll down korbe
  	elem.scrollTop = elem.scrollHeight;
});




// When the form is submitted
$('form').submit(function (e) {
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', { user: cookie.get('user') || 'Anonymous', message: message });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});


///////////////////////////

var ask = true;
window.onbeforeunload = function (e) {
    if(!ask) return null
    e = e || window.event;
    //old browsers
    if (e) {e.returnValue = 'Sure?';}
    //safari, chrome(chrome ignores text)
    return 'Sure?';
};