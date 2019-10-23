class Api::FriendshipsController < ApplicationController 
  def create
      @friendship = Friendship.new(friendship_params)
      if @friendship.save
          render :show
      end
  end

  def update
      @friendship = Friendship.find(params["friendship"][:id])
      # if @friendship.update_attributes(friendship_params)
      if @friendship.update_attributes(friendship_params)
          render :show
      end
  end

  def destroy
      @friendship = Friendship.find(params[:id])
      @friendship.destroy
      render :show
  end

  private

  def friendship_params
      params.require(:friendship).permit(:requester_id, :requested_id, :status)
  end
end