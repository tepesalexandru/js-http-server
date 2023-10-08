const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  // accept tcp connection
  socket.on("data", (data) => {
    // respond with a HTTP 200 OK
    socket.write("HTTP/1.1 200 OK\r\n\r\n");
    socket.end();
    server.close();
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
