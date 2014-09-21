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
    client = Yelp::Client.new({ consumer_key: "PBa1QqMWZhEn-axbRVGHjA",
                            consumer_secret: "oHOXxfWO-oFL9_KX_5eClacM-M0",
                            token: "7NH18JReQfACGZFSK8PdjSMQ7S6abdL-",
                            token_secret: "aAZgRxWPxxrpzc8xVWF6gm0zIJQ"
                          })
    type = params[:type]
    params = { term: type,
           limit: 20
         }
    
    locale = { lang: 'en' }
    
    response = client.search('San Francisco', params, locale)

    data = []

    response.businesses.each do |position|
      if position.location.has_key?("coordinate")
        
        lat = position.location.coordinate.latitude
        long = position.location.coordinate.longitude
        data << {lat: lat, long: long, title: position.name + "  (#{type})"}
      end
    end
    puts data
    render json: data
  end
  
end
