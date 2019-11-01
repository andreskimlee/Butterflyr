json.comments do
    json.set! @comment.id do 
        json.partial! 'api/comments/comment', comment: @comment
    end
    
end





