json.posts do 
    
    @posts.each do |post|
        json.set! post.id do
            json.partial! 'api/posts/post', post: post
        end
    end
end


json.user do 
    json.set! @user.id do
        json.partial! 'api/users/user', user: @user
    end
    @posts.each do |post|
        post.likes.each do |like|
            user2 = User.find(like.author_id) 
            json.set! user2.id do
                json.partial! 'api/users/user', user: user2
            end
        end    
    end
end 



