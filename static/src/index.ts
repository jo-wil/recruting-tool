let ws: WebSocket;

function onClose(event_: Event): void {
  console.log("onClose", event_);
}

function onMessage(event_: MessageEvent): void {
  console.log("onMessage", event_);
}

function onOpen(event_: Event): void {
  console.log("onOpen", event_);
  ws.send("Hi, Server from onOpen");
}

function sendMessage() {
  ws.send("Hi, Server from sendMessage");
}

function main() {
  console.log("app running");
  ws = new WebSocket("ws://localhost:8080");
  ws.addEventListener("close", onClose);
  ws.addEventListener("open", onOpen);
  ws.addEventListener("message", onMessage);
  const sendMessageButton = document.querySelector("#send-message");
  if (sendMessageButton !== null) {
    sendMessageButton.addEventListener("click", sendMessage);
  }
}

document.addEventListener("DOMContentLoaded", main);
