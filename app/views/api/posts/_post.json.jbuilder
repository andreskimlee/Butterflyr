
json.extract! post, :id, :body
json.authorId post.author_id
json.timestamp post.created_at
json.comments do 
    post.comments.each do |comment|
        json.set! comment.id do 
            json.partial! 'api/comments/comment', comment: comment
        end
    end
end

if post.likes 
    json.likes do 
        post.likes.each do |like|
            json.set! like.id do
                json.partial! 'api/likes/likes', like: like
                
        end
     end 
    end
end  




if post.photo.attached? 
    json.photo url_for(post.photo)
end