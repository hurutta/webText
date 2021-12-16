// Import the library
//const server = require('server');

// Launch the server to always answer "Hello world"
//server(ctx => 'Hello world!');

// /index.js

// /index.js

var all=new Array();


const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

const welCome = ctx => 
{
	all.push(ctx.data.user);
  	ctx.io.emit('onlineList', all);

};

const goodBye = ctx => 
{
	var pos;
	for(let i = 0; i < all.length;i++) 
	{
 		if(all[i]==ctx.data.user)
 		{
 			pos=i;
 		}
	}
	all.splice(pos,1);
  	ctx.io.emit('onlineList', all);
  	ctx.io.emit('message', ctx.data);

};


// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};


server([
  get('/', ctx => render('index.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage),
  socket('welcome', welCome),
  socket('goodbye', goodBye)
]);