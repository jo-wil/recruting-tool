//let ws: WebSocket;
//
//function onClose(event_: Event): void {
//  console.log("onClose", event_);
//}
//
//function onMessage(event_: MessageEvent): void {
//  console.log("onMessage", event_);
//}
//
//function onOpen(event_: Event): void {
//  console.log("onOpen", event_);
//  ws.send("Hi, Server from onOpen");
//}
//
//function sendMessage() {
//  ws.send("Hi, Server from sendMessage");
//}
//
//function main() {
//  console.log("app running");
//  ws = new WebSocket("ws://localhost:8080");
//  ws.addEventListener("close", onClose);
//  ws.addEventListener("open", onOpen);
//  ws.addEventListener("message", onMessage);
//  const sendMessageButton = document.querySelector("#send-message");
//  if (sendMessageButton !== null) {
//    sendMessageButton.addEventListener("click", sendMessage);
//  }
//}

type Interview = any;

function scheduleInterviewApi(data: Interview): Promise<string> {
  return window.fetch("/api/interview", {
    body: JSON.stringify(data)
  , headers:{
      "Content-Type": "application/json"
    }
  , method: "POST"
  })
  .then(response => response.text());
}

function scheduleInterview(event: Event): void {
  event.preventDefault();
  console.log("scheduleInterview", event);
  const element = event.srcElement;
  if (element) {
    const data = Array.from(element.querySelectorAll("[name]"))
                      .reduce((a: any, v: any) => ({ ...a, [v.name]: v.value }), {});
    console.log("data", data);
    scheduleInterviewApi(data)
      .then(result => {
        const message = document.querySelector("#message");
        if (message) {
          message.innerHTML = result;
        }
      });
  }
}

function main(): void {
  console.log("app running");
  const interviewForm = document.querySelector("#interview-form");
  if (interviewForm) {
    interviewForm.addEventListener("submit", scheduleInterview);
  }
}

document.addEventListener("DOMContentLoaded", main);
