Rails.application.routes.draw do

  resources :todos
  resources :tags, only: [:index, :show]

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end