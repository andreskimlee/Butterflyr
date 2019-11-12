import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
  }
  
  update(field) {
    return e =>
      this.setState({ [field]: e.currentTarget.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    App.cable.subscriptions.subscriptions[1].speak({ message: this.state.body });
=======
    App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body });
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
    this.setState({ body: "" });
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.body}
            onChange={this.update("body")}
            placeholder="Type message here"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default MessageForm;
