
json.extract! user, :id, :email, :first_name, :last_name, :email, :DOB, :cover_photo_url, :gender, :bio

json.createdAt user.created_at.strftime('%-B %-Y') 

if user.prof_photo.attached? 
    
    json.prof_photo url_for(user.prof_photo)
end

if user.cover_photo.attached?
    json.cover_photo url_for(user.cover_photo) 
end 

if user.photos.attached?     
    json.photos user.photos.map { |file| url_for(file) }
end

if user.received_friend_requests
    json.friend_requests user.received_friend_requests
end 

if user.received_friends 
    json.received_friends user.received_friends 
end 

if user.sent_friend_requests
    json.sent_friend_requests user.sent_friend_requests
    
end 

if user.requested_friends
    json.requested_friends user.requested_friends
end 



json.friends do 
    user.friends.each do |friend|
        json.set! friend.id do
            json.extract! friend, :id
            json.first_name friend.first_name
            json.last_name friend.last_name
            if friend.prof_photo.attached? 
                json.prof_photo url_for(friend.prof_photo)
            end
        end
    end
end 



# t.string "first_name", null: false
# t.string "last_name", null: false
# t.string "email", null: false
# t.string "DOB", null: false
# t.string "prof_photo_url"
# t.string "cover_photo_url"
# t.string "gender", null: false