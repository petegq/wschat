const WebSocket = require("ws");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverAddress = "ws://localhost:8080";
const client = new WebSocket(serverAddress);

client.on("open", () => {
  console.log("Connected to server:", serverAddress);

  rl.question("Enter your username: ", (username) => {
    console.log("You can now start chatting!");

    rl.on("line", (input) => {
      const message = `${username}: ${input}`;
      client.send(message);
    });
  });
});

client.on("message", (message) => {
  console.log(`> ${message}`);
});

client.on("close", () => {
  console.log("Disconnected from server");
  rl.close();
});
