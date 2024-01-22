const socket = io();
let userName;

let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".chat-body");
do {
  userName = prompt(`Please enter your name :`);
} while (!userName);

textArea.addEventListener(`keyup`, (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    userName: userName,
    message: message.trim(),
  };
  appendMessage(msg, "outgoing");
  textArea.value = "";
  scrollToBottom()
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
<h4>${msg.userName}</h4>
<p>${msg.message}</h4>

`;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
}

//receiver messages

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

//automatic scroll functionality

function scrollToBottom (){
    messageArea.scrollTop = messageArea.scrollHeight
}