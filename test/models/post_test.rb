# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  photo_url  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#  index_posts_on_user_id    (user_id)
#

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
