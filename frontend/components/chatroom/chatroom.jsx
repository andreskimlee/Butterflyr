import React from "react";
import MessageForm from "./messageForm";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  
  componentDidMount() {
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          switch (data.type) {
            case "message":
              this.setState({
                messages: this.state.messages.concat(data.message)
              });
              break;
            case "messages":
              this.setState({ messages: data.messages });
              break;
          }
        },
        speak: function(data) {return this.perform("speak", data)},
        load: function() {return this.perform("load")}
      }
    );
  }
  
  loadChat(e) {
    e.preventDefault();
    debugger 
    App.cable.subscriptions.subscriptions[1].load()
  }
  

  
  render() {
    const messageList = this.state.messages.map((message, idx) => {
      return (
        <li key={message.id}>
          {message} 
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="chatbox-container"> 
        
      <div className="chatroom-container">
        <button className="load-button" 
          onClick={this.loadChat.bind(this)}>
          Load Chat History
        </button>
        <div className="message-list">{messageList}</div>
        <MessageForm />
      </div>
      </div>
    );
  }
}

export default ChatRoom;