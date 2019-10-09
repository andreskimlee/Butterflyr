
json.extract! post, :id, :body
json.authorId post.author_id
json.timestamp post.created_at
 
if post.photo.attached? 
    json.photo url_for(post.photo)
end