# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  DOB             :string           not null
#  bio             :string
#  cover_photo_url :string
#  email           :string           not null
#  first_name      :string           not null
#  gender          :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  prof_photo_url  :string
#  school          :string
#  session_token   :string           not null
#  work            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#

class User < ApplicationRecord

    attr_reader :password
  
    validates :email, :password_digest, :session_token, :first_name, :last_name, :DOB, :gender, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
  
    after_initialize :ensure_session_token

    has_many :liked_things, :through => :likes, :source => :thing
    has_many :likes, 
      foreign_key: :author_id,
      class_name: :Like

    has_many :posts,
      foreign_key: :author_id,
      class_name: :Post
    has_many :comments,
      foreign_key: :author_id,
      class_name: :Comment
    has_many :sent_friend_requests, #user sent friend request. 
      foreign_key: :requester_id,
      class_name: :Friendship
    has_many :received_friend_requests, #returns all friend requests received all pending. 
      foreign_key: :requested_id,
      class_name: :Friendship
    has_many :requested_friends, #returns all friends requests sent 
      through: :sent_friend_requests,
      source: :requested
    has_many :received_friends, # returns the user who requested you. 
      through: :received_friend_requests,
      source: :requester
    has_one_attached :prof_photo
    has_one_attached :cover_photo
    has_many_attached :photos
    has_many :messages, 
      foreign_key: :author_id, 
      class_name: :Message
    

    
  
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      return nil unless user
      user.is_password?(password) ? user : nil
    end
  
    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  
    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def friend_ids
      @friend_ids ||= Friendship.select('requested_id, requester_id').where("requested_id = ? OR requester_id = ? AND status = 'accepted'", self.id, self.id).map {|el|
          el.requester_id + el.requested_id - self.id }
    end

    def friends 
        @friends ||= User.where('id IN (?)', self.friend_ids).includes(prof_photo_attachment: [:blob])
    end

    def received_requests
        ids = Friendship.select('requester_id, requested_id').where("requested_id = ? OR requester_id = ?", self.id, self.id).map {|el|
            el.requester_id + el.requested_id - self.id }
        @received_requests ||= User.where('id IN (?)', ids).includes(prof_photo_attachment: [:blob])
    end

    def friend_requests
        @friend_requests ||= Friendship.where("requested_id = ? OR requester_id = ?", self.id, self.id)
    end
  
    def reset_session_token!
      generate_unique_session_token
      save!
      self.session_token
    end
  
    private
  
    def ensure_session_token
      generate_unique_session_token unless self.session_token
    end
  
    def new_session_token
      SecureRandom.urlsafe_base64
    end
  
    def generate_unique_session_token
      self.session_token = new_session_token
      while User.find_by(session_token: self.session_token)
        self.session_token = new_session_token
      end
      self.session_token
    end
  
  end
  
