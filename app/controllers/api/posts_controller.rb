class Api::PostsController < ApplicationController
  before_action :require_logged_in  

  def create
    @post = Post.new(post_params)
      debugger
      if @post.save
          render :show
      else
          render json: @post.errors.full_messages, status: 422
      end
  end

  def index 
    @posts = User.find(params[:user_id]).posts
    render :index
  end 
  

  private

    def post_params
      params.require(:post).permit(:body, :author_id)
    end
end
