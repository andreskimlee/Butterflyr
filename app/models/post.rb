# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#

class Post < ApplicationRecord 
    # the author_id belongs to the user who made the post
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :comments, 
        foreign_key: :post_id,
        class_name: :Comment,
        dependent: :destroy
    
    has_many :likes, 
        primary_key: :id, 
        foreign_key: :likeable_id, 
        class_name: :Like,
        dependent: :destroy

    has_one_attached :photo
end 
