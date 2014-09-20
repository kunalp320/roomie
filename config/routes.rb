Rails.application.routes.draw do
  root 'homepage#index'
  #get 'profile#index'
  post '/search' => 'homepage#results', as: 'results'
end
