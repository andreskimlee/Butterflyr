class Api::LikesController < ApplicationController 
    def create  
        @like = Like.new(like_params)
        if @like.save!
            render :show
        end
    end


    def destroy
        @like = Like.find(params[:id])  
        if @like 
            @like.destroy
            render :show
        end
    end

    def like_params 
        params.require(:like).permit(:author_id, :likeable_id, :like_type, :likeable_type)
    end

end