# class ChatChannel < ApplicationCable::Channel
#   def subscribed
#     # stream_from "some_channel"
#   end

#   def unsubscribed
#     # Any cleanup needed when channel is unsubscribed
#   end
# end


class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'chat_channel'
  end

  def speak(data)
    message = Message.create(body: data['message'])
    message.chat_id = data['chat_id']
    message.author_id = data['author_id']
    socket = { message: message.body }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def load
    
    messages = Message.all.collect(&:body)
    socket = { messages: messages, type: 'messages' }
    ChatChannel.broadcast_to(@chat_channel, socket)
  end

  def unsubscribed; 
  end
end
