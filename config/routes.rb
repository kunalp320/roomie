Rails.application.routes.draw do
  root 'homepage#index'
  #get 'profile#index'
  post '/form' => 'homepage#form', as: 'form'
  post '/map' => 'form#map', as: 'map'
  get '/results' => 'homepage#results', as: 'results'
  get '/profile' => 'homepage#profile', as: 'profile'
  get '/save_prefs' => 'homepage#prefs', as: 'prefs'
  get '/yelp_prefs' => 'homepage#yelp_prefs', as: 'yelp_prefs'
end
