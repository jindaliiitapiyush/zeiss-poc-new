function sendMessage(socket, message) {
    if (message !== '') {
      // var chatMessage = {
      //     type: 'chat',
      //     sender: 'User',
      //     text: message
      // };
  
      
      // Send the message to the server
      socket.send(message);
    }
  }
  
  function appendMessageServer(message) {
    var chatBody = document.querySelector('.chat-body');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = "<span class='server-message'><b>Bot: </b>" + message + "</span>";
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function appendMessage(message) {
    // var input = document.getElementById('chat-input');
    // var message = input.value;
    // input.value = '';
  
    var chatBody = document.querySelector('.chat-body');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = "<span class='client-message'><b>You: </b>" + message + "</span>";
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  export default function decorate(block) {
      block.innerHTML = `<div class="chat-button">
          <button id="chat-button"></button>
        </div>
        <div class="chat-window">
          <div class="chat-header">
            <h3>Chat With Franklin</h3>
          </div>
          <div class="chat-body">
            <!-- Chat messages will be appended here dynamically -->
          </div>
          <div class="chat-footer">
            <input type="text" id="chat-input" placeholder="Type your message !" />
          </div>
      </div>`;
  
    var chatButton = document.getElementById('chat-button');
    if (chatButton) {
      chatButton.onclick = () => {
        var chatWindow = document.querySelector('.chat-window');
        chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'block' : 'none';
      }
    }
  
    var chatInputBox = document.querySelector('#chat-input');
    chatInputBox.onkeydown = (event) => {
      if (event.key === "Enter") {
        var message = document.getElementById('chat-input');
        if (message.value) {
          appendMessage(message.value);
          sendMessage(socket, message.value);
          document.getElementById('chat-input').value = '';
        }
      }
    }
  
    var socket = new WebSocket('ws://10.40.42.93:9090/getAnswer'); // Replace with your WebSocket server URL
    // var socket = new WebSocket('ws://localhost:3010'); // Replace with your WebSocket server URL
  
    socket.onopen = function() {
      console.log('WebSocket connection established.');
    };
  
    // Event listener for WebSocket messages
    socket.onmessage = function(event) {
      var message = JSON.parse(event.data);
  
      // Handle different message types from the server
      if (message && message.result) {
        appendMessageServer(message.result);
        // appendMessage(message.sender, message.text, chatbox);
      }
    };
  
    // socket.onmessage = function(event) {
    //   var message = JSON.parse(event.data);
  
    //   // Handle different message types from the server
    //   if (message && message.text) {
    //     appendMessageServer(message.text);
    //     // appendMessage(message.sender, message.text, chatbox);
    //   }
    // };
  
    document.addEventListener('click', function(event) {
      var chatWindow = document.querySelector('.chat-window');
      var chatButton = document.getElementById('chat-button');
      
      // Check if the clicked element is not inside the div
      if (!chatWindow.contains(event.target) && !chatButton.contains(event.target) && chatWindow.style.display === 'block') {
        // Close the div or perform any desired action
        chatWindow.style.display = 'none';
      }
    });
  }
  