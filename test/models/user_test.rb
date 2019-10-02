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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end