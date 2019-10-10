Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :show] do 
          resources :posts, only: [:index, :show, :create]
    end 
    resource :session, only: [:create, :destroy, :show]
    resources :posts, only: [:update, :destroy]
    resources :friendships, only: [:create, :destroy, :update]
    
  end 
  root "static_pages#root"
end
