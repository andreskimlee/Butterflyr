json.extract! user, :id, :email, :first_name, :last_name, :email, :DOB, :cover_photo_url, :gender
 
if user.prof_photo.attached? 
    json.prof_photo url_for(user.prof_photo)
end

# t.string "first_name", null: false
# t.string "last_name", null: false
# t.string "email", null: false
# t.string "DOB", null: false
# t.string "prof_photo_url"
# t.string "cover_photo_url"
# t.string "gender", null: false