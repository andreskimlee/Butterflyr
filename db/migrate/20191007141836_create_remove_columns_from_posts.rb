class CreateRemoveColumnsFromPosts < ActiveRecord::Migration[5.2]
  def change
    create_table :remove_columns_from_posts do |t|
      remove_column :posts, :user_id
      remove_column :posts, :photo_url 
      
      t.timestamps
    end
  end
end
