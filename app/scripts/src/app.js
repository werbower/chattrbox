import socket from "./ws-client";

import { ChatForm, ChatList } from "./dom";

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class ChatApp {
  constructor() {
    this.ChatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, "wonderwoman");
    //console.log('hello, ES6');
    socket.init("ws://localhost:3001");
    socket.registerOpenHandler(() => {
        
      this.ChatForm.init((data) => {
        let message = new ChatMessage({message:data});
        socket.sendMessage(message.serialize());
      });
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      
      let msg = new ChatMessage(data);
      this.chatList.drawMessage(msg.serialize());
    });
  }
}

class ChatMessage {
  constructor({
    message: m,
    user: u = "batman",
    timestamp: t = new Date().getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  serialize() {
    return {
        
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
    
  }
}

export default ChatApp;
