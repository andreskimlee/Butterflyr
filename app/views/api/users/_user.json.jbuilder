# debugger
json.extract! user, :id, :email, :first_name, :last_name, :email, :DOB, :cover_photo_url, :gender
 
if user.prof_photo.attached? 
    # debugger 
    json.prof_photo url_for(user.prof_photo)
end

if user.cover_photo.attached?
    json.cover_photo url_for(user.cover_photo) 
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




# t.string "first_name", null: false
# t.string "last_name", null: false
# t.string "email", null: false
# t.string "DOB", null: false
# t.string "prof_photo_url"
# t.string "cover_photo_url"
# t.string "gender", null: false