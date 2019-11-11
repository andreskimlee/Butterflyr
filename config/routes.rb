Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show] do 
          resources :posts, only: [:index, :show, :create]
    end 
    resource :session, only: [:create, :destroy, :show]
    resources :posts, only: [:update, :destroy] do 
      resource :comments, only: [:create]
    end 
    resources :friendships, only: [:create, :destroy, :update]
    resources :likes, only: [:create, :destroy]
    
  end 
  root "static_pages#root"
  mount ActionCable.server, at: '/cable'
end

