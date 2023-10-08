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

    // if the path is / then return HTTP 200 OK
    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
      socket.end();
      return;
    }
    // otherwise, rerturn HTTP 404 Not Found
    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
