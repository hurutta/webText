// ./public/javascript.js

// Get the current username from the cookies
var user = cookie.get('user');
if (!user) {

  // Ask for the username if there is none set already
  user = prompt('তোমার নাম : ');					//alert er moto box ashbe
  if (!user) {
    alert('আরে ভাই একটা ইউজার নেম দাও ?! 😬😬');
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
socket.emit('message', { user: cookie.get('user') || 'নাম দেয় নাই 🤖', message: 'aise' });
socket.emit('welcome', { user: cookie.get('user') || 'নাম দেয় নাই 🤖' });

        var str2="//counter.websiteout.net/compte.php?S=https://textweb.herokuapp.com/&C=36&D=0&N=0&M=0"+"?a=" + Math.random();
        $('.view').html('<h9 style="font-size:9px">&nbsp;&nbsp;&nbsp;সর্বমোট বার্তা : </h9> <img src="'+str2+'">');


socket.on('onlineList', function (data) 
{

  	//for(let i = 0; i < data.length;i++) 
  	//{
   	//	console.log(data[i]);
  	//}
    var str='<img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Online_dot.png" width="4%">&nbsp';
  	for(let i = 0; i < data.length;i++) 
  	{
        str=str+'<strong><a7 style="border-radius: 25px;border: 2px solid #73AD21;">'+data[i].slice(0,10)+'</a7></strong>&nbsp';
  	}
    $('.online').html(str);
  	console.log(data);
  	//$('.user-count').html('<strong>অনলাইনে আছে </strong>'+data+'<strong> জন&nbsp;</strong>');		//data - koyjon user ache tar int
});


///////////////////////////////////// 
/*
socket.on("disconnect", function (data) => {
  $('.chatbox').append('<h6> miao mioa <strong>' + data.user + '</strong> wefwef করেছেন </h6>');
  window.alert(123);

  socket.emit('message', { user: cookie.get('user') || 'নাম দেয় নাই 🤖', message: 'gese' });

});*/
/////////////////////////////////////////


// The user count. Can change when someone joins/leaves
socket.on('count', function (data) {
  $('.user-count').html('<strong>অনলাইনে আছে </strong>'+data+'<strong> জন&nbsp;</strong>');		//data - koyjon user ache tar int
});


/////////////////////////////////////////////////////////////////

socket.on('goodbye', function (data) 
{

	console.log(data.user);
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
  if(data.message=='gese')
  {
      $('.chatbox').append('<h4> এইমাত্র <strong>' + data.user + '</strong> ওয়েবটেক্সট থেকে প্রস্থান করেছেন </h4>');
  }else
	{
  		$('.chatbox').append('<p><strong>' + data.user + '</strong>: ' + data.message + ' <d1 style="text-align:right;color:gray;font-size: 10px;">' + strTime +'</d1></p>');
	    

        //////// total no of texting
        var str2="//counter.websiteout.net/compte.php?S=https://textweb.herokuapp.com/&C=36&D=0&N=0&M=0"+"?a=" + Math.random();
        $('.view').html('<h9 style="font-size:9px">&nbsp;&nbsp;&nbsp;সর্বমোট বার্তা : </h9> <img src="'+str2+'">');
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
$('form').submit(function (e) 
{
  // Avoid submitting it through HTTP
  e.preventDefault();

  // Retrieve the message from the user
  var message = $(e.target).find('input').val();

  // Send the message to the server
  socket.emit('message', { user: cookie.get('user') || 'নাম দেয় নাই 🤖', message: message });

  // Clear the input and focus it for a new message
  e.target.reset();
  $(e.target).find('input').focus();
});


///////////////////////////
/*
var ask = true;
window.onbeforeunload = function (e) {
    if(!ask) return null
    e = e || window.event;
    //old browsers
    if (e) {e.returnValue = 'Sure?';}
    //safari, chrome(chrome ignores text)
    return 'Sure?';
};*/


window.onbeforeunload = function (e) 
{
    socket.emit('goodbye', { user: cookie.get('user') || 'নাম দেয় নাই 🤖', message: 'gese'});
    //socket.emit('message', { user: cookie.get('user') || 'নাম দেয় নাই 🤖', message: 'gese' });
  	
}



$(document).ready(function ()
    {           
        $('.NO-CACHE').attr('src',function () { return $(this).attr('src') + "?a=" + Math.random() });
    });
var nods = document.getElementsByClassName('NO-CACHE');
for (var i = 0; i < nods.length; i++)
{
    nods[i].attributes['src'].value += "?a=" + Math.random();
}