import { store } from '../../store/store.js';

export function ChatPage() {
  return `
    <div class="chat-page">
      <div class="chat-container">
        <div class="chat-sidebar" id="chat-sidebar">
          <h2>Users</h2>
          <ul class="user-list" id="user-list">
            <!-- User list will be dynamically loaded here -->
          </ul>
        </div>
        <div class="chat-main">
          <div class="chat-header">
            <h1>Chat Room</h1>
          </div>
          <div class="chat-messages" id="chat-messages">
            <!-- Messages will be dynamically loaded here -->
          </div>
          <div class="chat-input">
            <input type="text" id="chat-input" placeholder="Type your message..." />
            <button id="send-message-btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function addChatEventListeners() {
  const userList = document.getElementById('user-list');

  // Kullanıcı listesini yükle
  if (userList) {
    loadUserList(userList);
  } else {
    console.error('User list element not found!');
  }

  const sendMessageButton = document.getElementById('send-message-btn');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Mesaj gönderme işlemleri
  if (sendMessageButton) {
    sendMessageButton.addEventListener('click', () => sendMessage(chatInput, chatMessages));
  }

  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage(chatInput, chatMessages);
      }
    });
  }
}


function loadUserList(userList) {
  const mockUsers = ['Alice', 'Bob', 'Charlie', 'Diana'];

  if (!mockUsers || mockUsers.length === 0) {
    userList.innerHTML = '<li class="user-item">No users available</li>';
    return;
  }

  mockUsers.forEach((user) => {
    const userItem = `<li class="user-item">${user}</li>`;
    userList.innerHTML += userItem;
  });
}


function sendMessage(chatInput, chatMessages) {
  const message = chatInput.value.trim();
  if (!message) return;

  // Simulate sending a message
  const newMessage = `<div class="chat-message user-message">${message}</div>`;
  chatMessages.innerHTML += newMessage;

  // Simulate a system response
  setTimeout(() => {
    const response = `<div class="chat-message system-message">System: Received your message!</div>`;
    chatMessages.innerHTML += response;

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  chatInput.value = '';
}

export function ChatPageWithListeners() {
  const view = ChatPage();
  setTimeout(() => {
    console.log('Initializing chat event listeners...');
    addChatEventListeners();
  }, 0); // DOM'un yüklendiğinden emin olmak için `setTimeout` kullanımı
  return view;
}

