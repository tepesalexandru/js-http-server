const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  // accept tcp connection
  socket.on("data", (data) => {
    console.log("data", data.toString());
    // extract data from the buffer
    const dataString = data.toString();
    // extract all data by separating by new line
    const dataArr = dataString.split("\r\n");
    // extract the first line
    const firstLine = dataArr[0];
    // extract the method
    const method = firstLine.split(" ")[0];
    // extract the path
    const path = firstLine.split(" ")[1];

    // the path will have the following format: /echo/<message>
    // extract the message
    const message = path.split("/")[2];

    // send the message back to the client
    socket.write(
      `HTTP/1.1 200 OK\r\nContent-Length: ${message.length}\r\n\r\n${message}`
    );
    socket.end();
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
