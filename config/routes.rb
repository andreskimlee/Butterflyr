Rails.application.routes.draw do

  resources :posts
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show] do 
          resources :posts, only: [:index, :show, :create]
    end 
    resource :session, only: [:create, :destroy, :show]
    
  end 
  root "static_pages#root"
end
