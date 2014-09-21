require 'yelp'
class HomepageController < ApplicationController
  
  def results
    @name = "Kunal"
    @people = [ {name: "Kunal", hobbies: "Sports"},
                {name: "Suren", hobbies: "Coding"},
                {name: "Chris", hobbies: "FSU"},
                {name: "Daniel", hobbies: "UI"},
                {name: "Kunal", hobbies: "Sports"},
                {name: "Suren", hobbies: "Coding"},
                {name: "Chris", hobbies: "FSU"},
                {name: "Daniel", hobbies: "UI"},
              ]
    render 'results/results'
  end

  def form
    @name = "Kunal"
  end

  def index
    render 'homepage/homepage'
  end

  def profile
    @name = "Suren"
    render 'profile/profile'
  end

  def prefs
    puts params
    return render 'profile/profile'
  end

  def yelp_prefs
    client = Yelp::Client.new({ consumer_key: YOUR_CONSUMER_KEY,
                            consumer_secret: YOUR_CONSUMER_SECRET,
                            token: YOUR_TOKEN,
                            token_secret: YOUR_TOKEN_SECRET
                          })
    return render 'profile/profile'
  end
  
end
