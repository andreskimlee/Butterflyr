# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  DOB             :string           not null
#  cover_photo_url :string
#  email           :string           not null
#  first_name      :string           not null
#  gender          :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  phone_number    :string           not null
#  prof_photo_url  :string
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_phone_number   (phone_number) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#

class User < ApplicationRecord

    attr_reader :password
  
    validates :email, :password_digest, :session_token, :first_name, :last_name, :DOB, :gender, :phone_number, presence: true
    validates :email, :phone_number, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
  
    after_initialize :ensure_session_token
  
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
  
