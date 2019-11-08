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

class Like < ApplicationRecord

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User
    
    belongs_to :post, 
    class_name: :Post, 
    foreign_key: :post_id,
    optional: true

    belongs_to :comment,
    class_name: :Comment,
    foreign_key: :comment_id,
    optional: true



end
