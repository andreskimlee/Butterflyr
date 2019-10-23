json.partial! "api/users/user", user: @user 
@user.received_friends.each do |person|
    json.set! person.id do
        json.extract! person, :id
        json.firstName person.first_name
        json.lastName person.last_name
        json.friendIds person.friend_ids
        if person.profile_photo.attached? 
            json.photoUrl url_for(person.profile_photo)
        end
    end
end
