Rails.application.routes.draw do
  root 'homepage#index'
  #get 'profile#index'
  post '/form' => 'homepage#form', as: 'form'
  post '/results' => 'homepage#results', as: 'results'
end
