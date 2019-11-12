class Api::MessagesController < ApplicationController
    def index  
        chatRoom = Channel.find(params[:id])
        @messages = Message.where(chatroom: chatRoom).includes(:author_id)
        render 'api/messages/index'
    end
  
<<<<<<< HEAD
    def show 
      @message = Message.includes(:author).find(params[:id])
      render 'api/messages/show'
    end
    
=======
    def show #tested
      @message = Message.includes(:author).find(params[:id])
      render 'api/messages/show'
    end
  
    def update #tested but still needs errors
      
      @message = Message.find(params[:id])
      if current_user.id == @message.author_id && @message.update(message_params)
        render 'api/messages/show'
      end
    end
  
    def destroy #tested
      @message = Message.find(params[:id])
      if current_user.id == @message.author_id
        @message.destroy!
        render json: @message.id
      end
    end
  
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
    private
    def message_params
      params.require(:message).permit(:body)
    end
  end
  