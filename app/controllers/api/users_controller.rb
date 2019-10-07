class Api::UsersController < ApplicationController
    def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
    
    def show 
      @user = User.find(params[:id])
      render "api/users/show"
    end

    def update 
        @user = User.find(params[:id])
        if @user.update_attributes(user_params)
          render "api/users/show"
        else 
          render json: @user.errors.full_messages
        end 
    end 
    
  end

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :DOB, :gender, :prof_photo, :cover_photo)
  end
end

