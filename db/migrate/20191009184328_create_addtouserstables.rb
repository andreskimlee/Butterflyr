class CreateAddtouserstables < ActiveRecord::Migration[5.2]
  def change 
      add_column :users, :school, :string
      add_column :users, :bio, :string
      add_column :users, :work, :string 
  end
end
