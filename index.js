// Import the library
//const server = require('server');

// Launch the server to always answer "Hello world"
//server(ctx => 'Hello world!');

// /index.js

// /index.js

const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
  ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};

// Send the new message to everyone
const sendMessage = ctx => {
  ctx.io.emit('message', ctx.data);
};

const welCome = ctx => {
  ctx.io.emit('welcomeMessage', ctx.data);
};

server([
  get('/', ctx => render('index.html')),
  socket('connect', updateCounter),
  socket('disconnect', updateCounter),
  socket('message', sendMessage),
  //socket('welcomeMessage', welCome)
]);