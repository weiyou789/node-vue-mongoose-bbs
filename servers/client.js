
var grpc = require('grpc');
var hello_proto = grpc.load('./protos/helloword.proto').examplecom.library;

function main() {
  var client = new hello_proto.Greeter('localhost:50051',
    grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });
  client.doSth({name: user}, function(err, response) {
    console.log('do:', response.message);
  });
}

main();