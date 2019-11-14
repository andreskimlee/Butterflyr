json.likes do 
     
    json.set! @like.id do 
        json.partial! 'api/likes/likes', like: @like 
    end
end

json.user do 
    json.set! @like.author_id do
     
        json.partial! 'api/users/user', user: User.find(@like.author_id)
    end
end

