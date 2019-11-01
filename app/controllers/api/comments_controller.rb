class Api::CommentsController < ApplicationController
    before_action :require_logged_in  
  
    def create
      @comment = Comment.new(comment_params) 
      @user = User.find(comment_params[:author_id])
      if @comment.save! && @user
        render :show
      end
    end
  
  
    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      render json: {id: @comment.id}
    end
    
    def comment_params
        params.require(:comment).permit(:body, :author_id, :photo, :post_id) 
    end

end
  