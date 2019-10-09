class Api::PostsController < ApplicationController
  before_action :require_logged_in  

  def create
    debugger 
    a = "aaaaa"
    @post = Post.new(post_params)
      debugger 
      if @post.save
          render :show
      else
          render json: @post.errors.full_messages, status: 422
      end
  end

  def index 
    # debugger 
    @posts = User.find(params[:user_id]).posts
    render :index
  end 

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
        render :show
    else
        render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end
  

  private
    def post_params
      params.require(:post).permit(:body, :author_id, :photo) 
    end
end
