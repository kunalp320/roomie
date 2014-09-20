Rails.application.routes.draw do
  root 'homepage#index'
  #get 'profile#index'
  post '/form' => 'homepage#form', as: 'form'
  post '/map' => 'form#map', as: 'map'
  get '/results' => 'homepage#results', as: 'results'

end
