var udp = require('dgram');

var clientPorts = []; // array to keep track of client ports
var clientNames = []; // array of client names, matches index of its port

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d',msg.length, info.address, info.port);

    if (!clientPorts.includes(info.port, 0)) {
      clientPorts.push(info.port); // adds each new client port to the array
      //clientNames.push(msg.toString()); // adds clients first input as their name
      //return; // causes first message (name input) to not be sent
    }

    for (const ports of clientPorts) { // send the message to each client
      //sending msg
      //append message with client name
      //var msgWithName = clientNames[i] + ': ' + msg;
      server.send(msg, ports, 'localhost',function(error){
        if(error){
            client.close();
        }else{
            console.log('Reply sent\n');
        }
      });
    }
});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(2222);

/*
setTimeout(function(){
server.close();
},60000);
*/
