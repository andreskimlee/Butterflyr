# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer          not null
#  post_id    :integer          not null
#

class Comment < ApplicationRecord
    belongs_to :post, 
    class_name: :Post, 
    foreign_key: :post_id

    belongs_to :author,
    foreign_key: :author_id,
    class_name: :User
    
    has_one_attached :photo

    has_many :likes, 
      primary_key: :id, 
      foreign_key: :likeable_id, 
      class_name: :Like,
      dependent: :destroy 
    

end
