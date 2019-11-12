import React from "react";
<<<<<<< HEAD
import MessageForm from "./MessageForm";
=======
import MessageForm from "./MessageForm.js";
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
<<<<<<< HEAD
=======
    this.bottom = React.createRef();
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
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
<<<<<<< HEAD
    debugger 
    App.cable.subscriptions.subscriptions[1].load()
  }
  

=======
    App.cable.subscriptions.subscriptions[0].load();
  }
  
  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
  
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
<<<<<<< HEAD
      <div className="chatbox-container"> 
        
      <div className="chatroom-container">
=======
      <div className="chatroom-container">
        <div>ChatRoom</div>
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
        <button className="load-button" 
          onClick={this.loadChat.bind(this)}>
          Load Chat History
        </button>
        <div className="message-list">{messageList}</div>
        <MessageForm />
      </div>
<<<<<<< HEAD
      </div>
=======
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
    );
  }
}

export default ChatRoom;