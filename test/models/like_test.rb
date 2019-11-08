# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  like_type     :string
#  likeable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer
#  likeable_id   :integer
#

require 'test_helper'

class LikeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
