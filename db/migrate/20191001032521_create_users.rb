class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :DOB, null: false 
      t.string :prof_photo_url
      t.string :cover_photo_url 
      t.string :gender, null:false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :school
      t.string :bio 
      t.string :work
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
