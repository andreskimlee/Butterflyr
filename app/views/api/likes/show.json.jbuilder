json.likes do 
    debugger 
    json.set! @like.id do 
        json.partial! 'api/likes/likes', like: @like 
    end
end

