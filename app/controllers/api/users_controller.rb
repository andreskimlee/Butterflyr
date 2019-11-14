class Api::UsersController < ApplicationController
    
    def create
      @user = User.new(user_params)
      if @user.save
        login(@user)
        render "api/users/show"
      else
        render json: @user.errors.full_messages, status: 422
      end
    end
      
    def show 
       
        @user = User.with_attached_prof_photo.with_attached_cover_photo.with_attached_photos.all
        .includes(:sent_friend_requests, :received_friend_requests, :received_friends, :requested_friends).find(params[:id])
        render "api/users/show"
    end

    def update
        
        @user = User.with_attached_prof_photo.with_attached_cover_photo.with_attached_photos.find(params[:id])
        
        if @user.update_attributes(user_params)
            render :show
        else 
          render json: @user.errors.full_messages
        end 
    end 
      
    # end
  
    def user_params
      params.require(:user).permit(:bio, :email, :password, :first_name, :last_name, :DOB, :gender, :prof_photo, :cover_photo, :cover_photo_url,  :photos)
    end
end
  
  