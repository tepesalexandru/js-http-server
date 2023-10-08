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

    // if the path is / then return 200 OK
    if (path === "/") {
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    }
    // if path starts with /echo/
    else if (path.startsWith("/echo/")) {
      // the path will have the following format: /echo/<message>
      // extract everything after /echo/
      const message = path.split("/echo/")[1];

      // send the message back to the client
      socket.write(
        `HTTP/1.1 200 OK\r\n\r\nContent-Type: text/plain\r\n\r\nContent-Length: ${message.length}\r\n\r\n${message}\r\n\r\n`
      );
    }
    // else return 404 Not Found
    else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }

    socket.end();
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
