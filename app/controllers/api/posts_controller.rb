class Api::PostsController < ApplicationController
  before_action :require_logged_in  

  def create
   
    @post = Post.new(post_params)
     
      if @post.save
          render :show
      else
          render json: @post.errors.full_messages, status: 422
      end
  end

  def index 
    @user  = User.find(params[:user_id])
    @posts = @user.posts
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
    render json: {id: @post.id}
  end
  

  private
    def post_params
      params.require(:post).permit(:body, :author_id, :photo) 
    end
end
