const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

function broadcast(message) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

server.on("connection", (client) => {
  console.log("Client connected");
  clients.add(client);

  client.on("message", (message) => {
    console.log(`Received message: ${message}`);
    broadcast(message);
  });

  client.on("close", () => {
    console.log("Client disconnected");
    clients.delete(client);
  });
});

console.log("WebSocket server started on port 8080");
