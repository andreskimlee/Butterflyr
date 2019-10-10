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

class Friendship < ApplicationRecord
    validates :status, presence: true 
    belongs_to :requester,
        foreign_key: :requester_id,
        class_name: :User

    belongs_to :requested,
        foreign_key: :requested_id,
        class_name: :User

end
