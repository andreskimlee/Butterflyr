class CreateRemoveColumnToLikesTables < ActiveRecord::Migration[5.2]
  def change
    create_table :remove_column_to_likes_tables do |t|
      remove_column :likes, :post_id
      remove_column :likes, :comment_id
      add_column :likes, :likeable_id, :integer
      add_column :likes, :likeable_type, :string 
      #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
    end
  end
end
