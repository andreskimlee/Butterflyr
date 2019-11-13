class Api::MessagesController < ApplicationController
    def index  
        chatRoom = Channel.find(params[:id])
        @messages = Message.where(chatroom: chatRoom).includes(:author_id)
        render 'api/messages/index'
    end
  
    def show 
      @message = Message.includes(:author).find(params[:id])
      render 'api/messages/show'
    end
    
    private
    def message_params
      params.require(:message).permit(:body)
    end
  end
  