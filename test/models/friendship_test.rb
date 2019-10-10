# == Schema Information
#
# Table name: friendships
#
#  id           :bigint           not null, primary key
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  requested_id :integer          not null
#  requester_id :integer          not null
#
# Indexes
#
#  index_friendships_on_requester_id_and_requested_id  (requester_id,requested_id) UNIQUE
#

require 'test_helper'

class FriendshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
