var udp = require('dgram');


var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

// Readline Interface to use command line
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//console.log('Enter your name: '); // client name


const question1 = () => {
  return new Promise((resolve, reject) => {

      // Ask my question
      rl.question("", function(txtChat) {

        if (txtChat == "q") { // client quit command
          process.exit();
        }

        //sending multiple msg
        client.send(txtChat,2222,'localhost',function(error){
          if(error){
            client.close();
          }else{
            console.log('Data sent');
          }
        });

        resolve();

      });
  });
};

const main = async () => {
  while(1==1) {
      await question1();
  }
}

main();