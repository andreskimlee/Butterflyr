json.partial! "api/users/user", user: @user 
@user.received_friends.each do |person|
    json.set! person.id do
        json.extract! person, :id
        json.firstName person.first_name
        json.lastName person.last_name
        json.id person.id
        if person.prof_photo.attached? 
            json.prof_photo url_for(person.prof_photo)
        end
        if person.cover_photo.attached?
            json.coverUrl url_for(person.cover_photo)
        end
    end
end
