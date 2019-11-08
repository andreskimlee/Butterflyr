json.extract! comment, :id, :body
json.authorId comment.author_id 
json.postId comment.post_id
author = User.find(comment.author_id)
json.first_name author.first_name
json.last_name author.last_name

if author.prof_photo.attached?
    json.prof_photo url_for(author.prof_photo)
end 

if comment.created_at.strftime('%-B,%-d,%-Y') == (Time.now - 1.day).strftime('%-B,%-d,%-Y')
    json.createdAt({date: 'Yesterday',
        time: comment.created_at.strftime('%-I:%M%p')})
elsif comment.created_at.strftime('%-B,%-d,%-Y') == Time.new.strftime('%-B,%-d,%-Y')
    json.createdAt({date: 'Today',
        time: comment.created_at.strftime('%-I:%M%p')})
elsif comment.created_at.strftime('%-Y') == Time.new.year.to_s
    json.createdAt({date: comment.created_at.strftime('%-B %-d'),
        time: comment.created_at.strftime('%-I:%M%p')})
else
    json.createdAt({date: comment.created_at.strftime('%-B %-d, %Y'),
        time: comment.created_at.strftime('%-I:%M%p')})
end

if comment.photo.attached? 
    json.photo url_for(comment.photo)
end

if comment.likes 
    json.likes do 
        comment.likes.each do |like|
            json.set! like.id do
                json.partial! 'api/likes/likes', like: like 
            end
        end 
    end 
end 